import React from 'react';
import SaitanLogo from '../images/SaitanLogo.png';

const Header = () => {
  return (
    <div className='navbar bg-base-100/30 backdrop-blur-md shadow-lg sticky top-0 z-20 px-2'>
      <div className='flex-1'>
        <img src={SaitanLogo} alt='logo' width={32} />
        <h1 className='font-bold normal-case text-3xl ml-2'>
          Saitan<span className='font-semibold text-2xl'> 時間割</span>
        </h1>
      </div>
      {/* <div className="flex-none">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              Menu
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
              <p className="text-slate-500 font-bold">zeroplus@gmail.com</p>
              <div className="collapse collapse-arrow border border-base-300 mt-6">
                <input type="checkbox" />
                <div className="collapse-title font-semibold">アカウント</div>
                <div className="collapse-content">
                  <p className="text-slate-500">メールアドレスを変更</p>
                  <p className="text-slate-500">パスワードを変更</p>
                </div>
              </div>
              <div className="collapse collapse-arrow border border-base-300 mt-1">
                <input type="checkbox" />
                <div className="collapse-title font-semibold">お問い合わせ</div>
                <div className="collapse-content">
                  <p className="text-slate-500">Hello</p>
                </div>
              </div>
              <div className="collapse collapse-arrow border border-base-300 mt-1">
                <input type="checkbox" />
                <div className="collapse-title font-semibold">規約</div>
                <div className="collapse-content">
                  <p className="text-slate-500">Hello</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Header;
