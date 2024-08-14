import React, { useEffect, useState } from 'react';
import './style.css';
import Pagination from 'components/Pagination';
import { usePagination } from 'hooks'; // 페이지네이션 훅을 사용합니다.

export default function NEARBY() {
    const [map, setMap] = useState<any>(null);
    const [keyword, setKeyword] = useState('');
    const [places, setPlaces] = useState<any[]>([]);
    const [pagination, setPagination] = useState<any>(null); // 페이지네이션 객체 저장
    const { currentPage, viewList, setTotalList, setCurrentPage } = usePagination<any>(8);

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

        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: mapInstance,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
            content: createInfoWindowContent('📍 현재 위치', '지금 이곳에 계세요!'),
            removable: true, // 닫기 버튼 추가
        });

        infowindow.open(mapInstance, marker);
    };

    const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            searchPlaces();
        }
    };

    const searchPlaces = (page = 1) => {
        if (!map) return;

        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(keyword, (data: any[], status: string, pagination: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setPlaces(data);
                setTotalList(data); // 전체 목록을 페이지네이션 훅에 설정합니다.
                setPagination(pagination); // 페이지네이션 객체를 저장합니다.
                displayMarkers(data);
            }
        }, {
            page
        });
    };

    const displayMarkers = (places: any[]) => {
        // 기존 마커 및 인포윈도우 제거
        if (map.markers) {
            map.markers.forEach((marker: any) => marker.setMap(null));
        }

        const bounds = new window.kakao.maps.LatLngBounds();

        places.forEach((place: any) => {
            const position = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = new window.kakao.maps.Marker({
                position: position,
                map: map,
            });

            const roadAddress = place.road_address_name || place.address_name; // 도로명 주소가 없으면 지번 주소를 사용
            const infowindow = new window.kakao.maps.InfoWindow({
                content: createInfoWindowContent(place.place_name, roadAddress),
                removable: true,
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
                infowindow.open(map, marker);
            });

            bounds.extend(position);
        });

        map.setBounds(bounds);
    };

    const createInfoWindowContent = (title: string, address: string) => {
        return `
            <div class="infowindow-content">
                <div class="infowindow-title">${title}</div>
                <div class="infowindow-subtitle">${address}</div>
            </div>
        `;
    };

    const goToNextPage = () => {
        if (pagination && pagination.hasNextPage) {
            pagination.nextPage();
        }
    };

    const goToPrevPage = () => {
        if (pagination && pagination.hasPrevPage) {
            pagination.prevPage();
        }
    };

    return (
        <div id='nearby-wrapper'>
            <div className='nearby-container'>
                <div className="map-container">
                    <div id="map" />
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
                        <button onClick={() => searchPlaces(1)}>검색</button>
                    </div>
                    <div id="result-list" className="result-list">
                        <ul>
                            {viewList.map((place, index) => (
                                <li key={index} onClick={() => displayMarkers([place])}>
                                    {place.place_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="pagination">
                        <button onClick={goToPrevPage} disabled={!pagination?.hasPrevPage}>이전</button>
                        <button onClick={goToNextPage} disabled={!pagination?.hasNextPage}>다음</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
