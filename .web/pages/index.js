import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, set_val, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Button, Center, Flex, Heading, HStack, Image, Input, Link, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Spacer, Stat, StatHelpText, StatNumber, Text, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import { Bar as RechartsBar, ResponsiveContainer as RechartsResponsiveContainer, XAxis as RechartsXAxis, YAxis as RechartsYAxis } from "recharts"
import dynamic from "next/dynamic"
import { HamburgerIcon } from "@chakra-ui/icons"
import NextHead from "next/head"

const RechartsBarChart = dynamic(() => import('recharts').then((mod) => mod.BarChart), { ssr: false });


export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])

  const ref_caffeine_level = useRef(null); refs['ref_caffeine_level'] = ref_caffeine_level;
  const ref_drink_name = useRef(null); refs['ref_drink_name'] = ref_drink_name;
  const ref_time = useRef(null); refs['ref_time'] = ref_time;

  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <HStack alignItems={`flex-start`} sx={{"transition": "left 0.5s, width 0.5s", "position": "relative"}}>
  <Box sx={{"display": ["none", "none", "block"], "minWidth": "20em", "height": "100%", "position": "sticky", "top": "0px", "borderRight": "1px solid #F4F3F6"}}>
  <VStack sx={{"height": "100dvh"}}>
  <HStack sx={{"width": "100%", "borderBottom": "1px solid #F4F3F6", "padding": "1em"}}>
  <Image src={`/logo.png`} sx={{"height": "6em"}}/>
  <Spacer/>
  <Link as={NextLink} href={`https://github.com/luludai-24/cal_hacks/tree/main`}>
  <Center sx={{"boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "bg": "transparent", "borderRadius": "0.375rem", "_hover": {"bg": "#F5EFFE"}}}>
  <Image src={`/github.svg`} sx={{"height": "3em", "padding": "0.5em"}}/>
</Center>
</Link>
</HStack>
  <VStack alignItems={`flex-start`} sx={{"width": "100%", "overflowY": "auto", "padding": "1em"}}>
  <Link as={NextLink} href={`/`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/home") || (((state.router.page.path === "/") && "Home") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/home") || (((state.router.page.path === "/") && "Home") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/bean.png`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Home`}
</Text>
</HStack>
</Link>
  <Link as={NextLink} href={`/dashboard`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/calculator") || (((state.router.page.path === "/") && "Calculator") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/calculator") || (((state.router.page.path === "/") && "Calculator") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/chemex.png`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Calculator`}
</Text>
</HStack>
</Link>
  <Link as={NextLink} href={`/settings`} sx={{"width": "100%"}}>
  <HStack sx={{"bg": isTrue((state.router.page.path === "/drinks") || (((state.router.page.path === "/") && "Drinks") === "Home")) ? `#F5EFFE` : `transparent`, "color": isTrue((state.router.page.path === "/drinks") || (((state.router.page.path === "/") && "Drinks") === "Home")) ? `#1A1060` : `black`, "borderRadius": "0.375rem", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "width": "100%", "paddingX": "1em"}}>
  <Image src={`/french_press.png`} sx={{"height": "2.5em", "padding": "0.5em"}}/>
  <Text>
  {`Drinks`}
</Text>
</HStack>
</Link>
</VStack>
  <Spacer/>
  <HStack sx={{"width": "100%", "borderTop": "1px solid #F4F3F6", "padding": "1em"}}>
  <Spacer/>
  <Link as={NextLink} href={`https://reflex.dev/docs/getting-started/introduction/`}>
  <Text>
  {`About`}
</Text>
</Link>
  <Link as={NextLink} href={`https://reflex.dev/blog/`}>
  <Text>
  {`Blog`}
</Text>
</Link>
</HStack>
</VStack>
</Box>
  <Box sx={{"paddingTop": "5em", "paddingX": ["auto", "2em"]}}>
  <Box sx={{"width": "100%", "alignItems": "flex-start", "boxShadow": "0px 0px 0px 1px rgba(84, 82, 95, 0.14)", "borderRadius": "0.375rem", "padding": "1em", "marginBottom": "2em"}}>
  <VStack alignItems={`left`} sx={{"width": "100%"}}>
  <VStack alignItems={`left`} sx={{"width": "100%"}}>
  <HStack>
  <Image src={`/bean.png`} sx={{"width": "32px", "height": "32px"}}/>
  <Heading>
  {`Home`}
</Heading>
</HStack>
  <Text>
  {`-------------------------------------------------------------------------------------------------`}
</Text>
  <Text sx={{"fontSize": "lg", "textAlign": "left"}}>
  {`Caffeine Intake`}
</Text>
</VStack>
  <Flex sx={{"width": "100%", "alignItems": "left"}}>
  <Image src={`/dripper.png`} sx={{"width": "64px", "height": "64px"}}/>
  <Spacer/>
  <VStack alignItems={`left`}>
  <Stat>
  <StatHelpText>
  {`Current`}
</StatHelpText>
  <StatNumber>
  {`190 mg`}
</StatNumber>
</Stat>
  <Stat>
  <StatHelpText>
  {`Day Total`}
</StatHelpText>
  <StatNumber>
  {`300 mg`}
</StatNumber>
</Stat>
</VStack>
  <Spacer/>
  <Stat>
  <StatHelpText>
  {`Drinks`}
</StatHelpText>
  <StatNumber>
  {`2 cups`}
</StatNumber>
</Stat>
</Flex>
  <Box sx={{"bg": "#004FAC", "color": "white", "borderRadius": "xl", "width": "100%", "textAlign": "center"}}>
  {`Caffeine Budget Remaining (based on 400 mg daily limit): 100 mg`}
</Box>
  <VStack alignItems={`left`} sx={{"width": "100%"}}>
  <Text>
  {`-------------------------------------------------------------------------------------------------`}
</Text>
  <Text sx={{"fontSize": "lg", "textAlign": "left"}}>
  {`Caffeine Levels`}
</Text>
</VStack>
  <RechartsResponsiveContainer height={`100%`} minHeight={100} minWidth={200} width={`100%`}>
  <RechartsBarChart data={state.caffeine_levels} height={`100%`} width={`100%`}>
  <RechartsBar dataKey={`caffeine`} fill={`#57A4FF`} stroke={`#57A4FF`}/>
  <RechartsXAxis dataKey={`time`}/>
  <RechartsYAxis/>
</RechartsBarChart>
</RechartsResponsiveContainer>
  <NumberInput min={0} onChange={(_e0) => addEvents([Event("state.set_caffeine", {value:_e0})], (_e0))}>
  <NumberInputField/>
  <NumberInputStepper>
  <NumberIncrementStepper/>
  <NumberDecrementStepper/>
</NumberInputStepper>
</NumberInput>
  <NumberInput max={23} min={0} onChange={(_e0) => addEvents([Event("state.set_time", {value:_e0})], (_e0))}>
  <NumberInputField/>
  <NumberInputStepper>
  <NumberIncrementStepper/>
  <NumberDecrementStepper/>
</NumberInputStepper>
</NumberInput>
  <VStack alignItems={`left`} sx={{"width": "100%"}}>
  <Text>
  {`-------------------------------------------------------------------------------------------------`}
</Text>
  <Text sx={{"fontSize": "lg", "textAlign": "left"}}>
  {`Drinks of the Day`}
</Text>
</VStack>
  <VStack>
  <Flex sx={{"width": "100%"}}>
  <Image src={`/frappe.png`} sx={{"width": "32px", "height": "32px"}}/>
  <Text>
  {`Caffe Latte`}
</Text>
  <Spacer/>
  <Text>
  {`154 mg`}
</Text>
</Flex>
  <Flex sx={{"width": "100%"}}>
  <Image src={`/cup.png`} sx={{"width": "32px", "height": "32px"}}/>
  <Text>
  {`Espresso`}
</Text>
  <Spacer/>
  <Text>
  {`154 mg`}
</Text>
</Flex>
</VStack>
  <Button onClick={(_e) => addEvents([Event("state.change", {})], (_e))}>
  {`Add Drink`}
</Button>
  <Modal isOpen={state.show}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Add Drink`}
</ModalHeader>
  <VStack>
  <Box as={`form`} onSubmit={(_e0) => addEvents([Event("state.handle_submit", {form_data:{"time": getRefValue(ref_time), "drink_name": getRefValue(ref_drink_name), "caffeine_level": getRefValue(ref_caffeine_level)}})], (_e0))}>
  <VStack>
  <Input id={`drink_name`} placeholder={`Drink Name`} ref={ref_drink_name} type={`text`}/>
  <Input id={`caffeine_level`} placeholder={`Caffeine Level`} ref={ref_caffeine_level} type={`text`}/>
  <Input id={`time`} placeholder={`Time (24 hour format)`} ref={ref_time} type={`text`}/>
  <Button type={`submit`}>
  {`Submit`}
</Button>
</VStack>
</Box>
</VStack>
  <ModalFooter>
  <Button onClick={(_e) => addEvents([Event("state.change", {})], (_e))}>
  {`Close`}
</Button>
</ModalFooter>
</ModalContent>
</ModalOverlay>
</Modal>
</VStack>
</Box>
</Box>
  <Spacer/>
  <Box sx={{"position": "fixed", "right": "1.5em", "top": "1.5em", "zIndex": "500"}}>
  <Menu>
  <MenuButton sx={{"width": "3em", "height": "3em", "backgroundColor": "white", "border": "1px solid #F4F3F6", "borderRadius": "0.375rem"}}>
  <HamburgerIcon sx={{"size": "4em", "color": "black"}}/>
</MenuButton>
  <MenuList>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/`} sx={{"width": "100%"}}>
  {`Home`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/dashboard`} sx={{"width": "100%"}}>
  {`Calculator`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`/settings`} sx={{"width": "100%"}}>
  {`Drinks`}
</Link>
</MenuItem>
  <MenuDivider/>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`https://github.com/reflex-dev`} sx={{"width": "100%"}}>
  {`About`}
</Link>
</MenuItem>
  <MenuItem sx={{"_hover": {"bg": "#F5EFFE"}}}>
  <Link as={NextLink} href={`mailto:founders@=reflex.dev`} sx={{"width": "100%"}}>
  {`Contact`}
</Link>
</MenuItem>
</MenuList>
</Menu>
</Box>
</HStack>
  <NextHead>
  <title>
  {`Home`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`/bean.png`} property={`og:image`}/>
  <meta content={`width=device-width, shrink-to-fit=no, initial-scale=1`} name={`viewport`}/>
</NextHead>
</Fragment>
  )
}
