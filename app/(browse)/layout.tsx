import { Suspense } from "react";

import { Navbar } from "./_components/navbar";
import { Container } from "./_components/container";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";

import { ThemeProvider } from "@/components/theme-provider";

const BrowseLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return ( 
    <>
      <Navbar />
      <div className="bg-background flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>
          <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="gamehub-theme-2"
          >
          {children}
          </ThemeProvider>
        </Container>
      </div>
    </>
  );
};
 
export default BrowseLayout;