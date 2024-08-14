import React, { useEffect, useState } from 'react';
import './style.css';

export default function NEARBY() {
    const [map, setMap] = useState<any>(null);
    const [keyword, setKeyword] = useState('');
    const [places, setPlaces] = useState<any[]>([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    initializeMap(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    initializeMap(37.5665, 126.9780); // 기본 위치
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            initializeMap(37.5665, 126.9780); // 기본 위치
        }
    }, []);

    const initializeMap = (lat: number, lng: number) => {
        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
        };

        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchPlaces();
        }
    };

    const searchPlaces = () => {
        if (!map) return;

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(keyword, (data: any[], status: string, pagination: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setPlaces(data);
                displayMarkers(data);
            } else {
                alert('검색 결과가 없습니다.');
            }
        });
    };

    const displayMarkers = (places: any[]) => {
        // 기존 마커 제거
        map.markers && map.markers.forEach((marker: any) => marker.setMap(null));
        map.markers = [];

        const bounds = new window.kakao.maps.LatLngBounds();

        places.forEach((place: any) => {
            const position = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = new window.kakao.maps.Marker({
                map: map,
                position: position,
            });

            map.markers.push(marker);

            window.kakao.maps.event.addListener(marker, 'click', () => {
                displayInfowindow(marker, place.place_name);
            });

            bounds.extend(position);
        });

        map.setBounds(bounds);
    };

    const displayInfowindow = (marker: any, title: string) => {
        const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;z-index:1;">${title}</div>`,
        });
        infowindow.open(map, marker);
    };

    return (
        <div id='nearby-wrapper'>
            <div className='nearby-container'>
                <div className="map-container">
                    <div id="map" style={{ width: "500px", height: "100%" }} />
                </div>
                <div className="search-container">
                    <div className='nearby-title'>
                        {'🛒내주변 맛집을 \n How?Se에서!'}
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            value={keyword}
                            onChange={handleKeywordChange}
                            onKeyDown={handleKeyPress}
                            placeholder="장소를 입력하세요"
                        />
                        <button onClick={searchPlaces}>검색</button>
                    </div>
                    <div id="result-list" className="result-list">
                        <ul>
                            {places.map((place) => (
                                <li key={place.id} onClick={() => displayMarkers([place])}>
                                    {place.place_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
