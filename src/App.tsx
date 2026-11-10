/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { StraightforwardLandingPage } from './components/StraightforwardLandingPage';
import { FamilyHappinessMap } from './components/FamilyHappinessMap';
import { AffiliateLandingPage } from './components/AffiliateLandingPage';
import { AffiliateHomePage } from './components/AffiliateHomePage';
// Trang kết quả chứa kho dữ liệu lớn → chỉ tải khi người dùng mở /ketqua
const ResultPage = lazy(() => import('./components/ResultPage').then((m) => ({ default: m.ResultPage })));

type Route = 'home' | 'bando' | 'affiliate' | 'affiliate-home' | 'ketqua';

// Hàm kiểm tra route độc lập theo link URL
function getRouteFromLocation(): Route {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Trang tra cứu kết quả: /ketqua, #ketqua, ?ketqua
  if (path.includes('/ketqua') || path.includes('/ket-qua') || hash.includes('ketqua') || search.includes('ketqua')) return 'ketqua';

  // Nhận diện link Bản Đồ Hạnh Phúc:
  // Hỗ trợ truy cập trực tiếp qua:
  // 1. Path: /bando, /bando/, /ban-do, /ban-do-hanh-phuc, /khao-sat
  // 2. Hash: #bando, #ban-do
  // 3. Query: ?bando, ?page=bando, ?form=bando
  const isBando =
    path.includes('/bando') ||
    path.includes('/ban-do') ||
    path.includes('/khao-sat') ||
    hash.includes('bando') ||
    hash.includes('ban-do') ||
    search.includes('bando') ||
    search.includes('page=bando') ||
    search.includes('form=bando');

  if (isBando) return 'bando';

  // Trang đích sau khi đăng ký Thử thách Affiliate: /home
  if (path === '/home' || path.startsWith('/home/')) return 'affiliate-home';

  // Nhận diện link Thử Thách 2 Ngày Affiliate:
  // Path: /affiliate, /thu-thach · Hash: #affiliate · Query: ?affiliate, ?page=affiliate
  const isAffiliate =
    path.includes('/affiliate') ||
    path.includes('/thu-thach') ||
    hash.includes('affiliate') ||
    search.includes('affiliate');

  return isAffiliate ? 'affiliate' : 'home';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<Route>(getRouteFromLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(getRouteFromLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Các trang tách biệt hoàn toàn độc lập, hiển thị chính xác theo link URL */}
      {currentRoute === 'ketqua' ? (
        <Suspense fallback={<div className="min-h-screen bg-[#0d0f14]" />}>
          <ResultPage />
        </Suspense>
      ) : currentRoute === 'bando' ? (
        <FamilyHappinessMap />
      ) : currentRoute === 'affiliate' ? (
        <AffiliateLandingPage />
      ) : currentRoute === 'affiliate-home' ? (
        <AffiliateHomePage />
      ) : (
        <StraightforwardLandingPage />
      )}
    </div>
  );
}
