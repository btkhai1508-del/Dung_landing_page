/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StraightforwardLandingPage } from './components/StraightforwardLandingPage';
import { FamilyHappinessMap } from './components/FamilyHappinessMap';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'home' | 'bando'>('bando');

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const savedRoute = localStorage.getItem('dung_preview_route');

      // Kiểm tra xem người dùng có truy cập qua link trực tiếp Bản đồ Hạnh phúc Gia đình không:
      // Hỗ trợ: /bando, /bando-hanh-phuc, /ban-do-hanh-phuc, /khao-sat, ?page=bando, ?bando, #bando, hoặc lưu trước đó
      const isBando =
        path.includes('bando') ||
        path.includes('ban-do') ||
        path.includes('khao-sat') ||
        search.includes('bando') ||
        search.includes('page=bando') ||
        search.includes('form=bando') ||
        hash.includes('bando') ||
        hash.includes('ban-do') ||
        savedRoute === 'bando' ||
        (!savedRoute && !hash.includes('home')); // Mặc định mở trang khảo sát đang hoàn thiện nếu chưa lưu

      const selected = isBando ? 'bando' : 'home';
      setCurrentRoute(selected);
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  const handleSwitch = (route: 'home' | 'bando') => {
    setCurrentRoute(route);
    localStorage.setItem('dung_preview_route', route);
    if (route === 'bando') {
      window.location.hash = 'bando';
    } else {
      window.location.hash = 'home';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Hiển thị trang tương ứng */}
      {currentRoute === 'bando' ? <FamilyHappinessMap /> : <StraightforwardLandingPage />}

      {/* Nút chuyển đổi nhanh giữa 2 website độc lập dành cho người quản trị / xem trước */}
      <aside
        aria-label="Chuyển chế độ xem"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 p-1.5 bg-neutral-900/90 text-white rounded-full border border-white/20 shadow-2xl backdrop-blur-md text-xs font-medium"
      >
        <span className="hidden sm:inline-block px-2 text-[11px] text-neutral-400">
          Chuyển trang:
        </span>
        <button
          type="button"
          onClick={() => handleSwitch('home')}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentRoute === 'home'
              ? 'bg-white/20 text-white font-bold shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Trang Landing
        </button>
        <button
          type="button"
          onClick={() => handleSwitch('bando')}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentRoute === 'bando'
              ? 'bg-[#FA5B13] text-white font-bold shadow-xs'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Bản Đồ Hạnh Phúc
        </button>
      </aside>
    </div>
  );
}
