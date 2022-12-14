import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Stack, useBreakpointValue } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import { SidebarNav } from "./SidebarNav";

export function SideBar() {
  const { isOpen, onClose } = useSidebarDrawer()
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  })

  if(isDrawerSidebar) {
    return(
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg="gray.800" padding="4">
          <DrawerCloseButton mt="6"/>
          <DrawerHeader>Navegação</DrawerHeader>
          <DrawerBody>
            <SidebarNav />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    );
  }
  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav />
    </Box>
  )
}