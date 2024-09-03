"use client"

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProfileForm from "@/components/ProfileForm/ProfileForm";
import ProfilePreview from "@/components/ProfilePreview";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useSidebarStore from "@/store/SidebarStore";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const isOpen = useSidebarStore((state) => state.isOpen);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <main className="h-screen p-3 flex overflow-hidden w-full">
      <Sidebar />
      <div className={`flex-grow flex flex-col transition-all duration-300 ${isOpen ? 'ml-6' : isMobile ? 'ml-16' : 'ml-6'}`}>
        <Header />
        <div className="flex-grow w-full overflow-hidden mt-4 ">
          {isMobile ? (
            <Tabs defaultValue="profile" className="w-full h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="flex-grow overflow-auto">
                <ProfileForm />
              </TabsContent>
              <TabsContent value="preview" className="flex-grow overflow-auto">
                <ProfilePreview />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex h-full w-full lg:flex-row gap-4 justify-between overflow-hidden">
              <div className="w-full md:w-[85%] h-full overflow-auto">
                <ProfileForm />
              </div>
              <div className="w-full h-full overflow-auto">
                <ProfilePreview />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}