// src/app/page.tsx
import Sidebar from './components/molecules/Sidebar';
import Heading from './components/atoms/Heading';
import Scheduler from './components/organisms/Scheduler';
import AssignmentPicker from './components/molecules/AssignmentPicker';
import ScheduleProvider from './state/ScheduleProvider';
import { ToastProvider } from './state/ToastProvider';

export default function HomePage() {
  return (
    <ScheduleProvider>
       <ToastProvider>
      <div className=" bg-gray-100"> 
        <div>

          {/* ANA İÇERİK KAPSAYICISI */}
          <div className="mt-2 flex gap-2 "> 
            
            {/* 1. Kenar Çubuğu */}
            <div id="sidebar" className="w-2/7 ">
              <Sidebar />
            </div>

            {/* 2. Ana İçerik - Scheduler ve AssignmentPicker'ı tutan kapsayıcı */}
            <div id="main-content" className="w-2/3 flex-grow bg-white shadow-2xl rounded-xl p-1 overflow-y-hidden"> 
              
              {/* İÇERİK FLEX KUTUSU: Tablo ve Liste Yan Yana */}
              <div className="flex h-full gap-2">
                
                {/* A. Program Tablosu (Geniş alan) */}
                <div className="flex-grow w-3/4"> 
                  <Scheduler /> 
                </div>

                {/* B. Atama Listesi (Daha dar bir alan) */}
                <div className="w-1/4 min-w-[200px] border-l pl-2">
                  <AssignmentPicker />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      </ToastProvider>
    </ScheduleProvider>
  );
}