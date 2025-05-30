"use client"

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProfileForm from "@/components/ProfileForm/ProfileForm";
import ProfilePreview from "@/components/ProfilePreview";
import { AppSidebar } from "@/components/Sidebar/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  SidebarInset,
  useSidebar
} from "@/components/ui/sidebar";

function HomeContent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <SidebarInset className="flex flex-col h-screen">
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 p-4 pb-0">
          <Header />
        </div>
        <div className="flex-1 p-4 pt-4 min-h-0">
          {isMobile ? (
            <Tabs defaultValue="profile" className="w-full h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="profile" className="flex-1 min-h-0">
                <div className="h-full overflow-y-auto">
                  <ProfileForm />
                </div>
              </TabsContent>
              <TabsContent value="preview" className="flex-1 min-h-0">
                <div className="h-full overflow-y-auto">
                  <ProfilePreview />
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex h-full w-full lg:flex-row gap-4 justify-between min-h-0">
              <div className="w-full md:w-[85%] min-h-0">
                <ProfileForm />
              </div>
              <div className="w-full min-h-0">
                <ProfilePreview />
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarInset>
  );
}

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full sm:px-6 mx-auto">
        <AppSidebar />
        <HomeContent />
      </div>
    </SidebarProvider>
  );
}