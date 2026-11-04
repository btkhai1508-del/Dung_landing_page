/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StraightforwardLandingPage } from './components/StraightforwardLandingPage';
import { FamilyHappinessMap } from './components/FamilyHappinessMap';

// Hàm kiểm tra route độc lập theo link URL
function getRouteFromLocation(): 'home' | 'bando' {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();
  const hash = window.location.hash.toLowerCase();

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

  return isBando ? 'bando' : 'home';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'bando'>(getRouteFromLocation);

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
      {/* Hai trang tách biệt hoàn toàn độc lập, hiển thị chính xác theo link URL */}
      {currentRoute === 'bando' ? <FamilyHappinessMap /> : <StraightforwardLandingPage />}
    </div>
  );
}
