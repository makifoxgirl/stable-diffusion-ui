import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Flex,
	Image,
	Modal,
	ModalContent,
	ModalOverlay,
	Spinner,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDownload } from "react-icons/md";
import { Result } from "../interfaces/Result";

async function downloadFile(url: string, filename: string) {
	// const a = document.createElement("a");
	// a.href = url;
	// a.download = filename;
	// document.body.appendChild(a);
	// a.click();
	const res = await fetch(url);
	const buffer = await res.arrayBuffer();
	const objectUrl = window.URL.createObjectURL(new Blob([buffer]));
	const link = document.createElement("a");
	link.href = objectUrl;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	link.remove();
}

export default function ImageResult(props: {
	src: string;
	result: Result;
	height: string;
	areWorkingXTo?: string;
}) {
	const [downloading, setDownloading] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Flex
			w="100%"
			h={props.height}
			flexDirection={"column"}
			alignItems={"center"}
		>
			{props.src == "" ? (
				<Box
					h={props.height}
					style={{ aspectRatio: "1 / 1" }}
					backgroundColor="rgba(0,0,0,0.05)"
					borderRadius={8}
					onClick={onOpen}
					// cursor={"pointer"} // not when loading
					objectFit={"contain"}
				>
					<Flex
						h="100%"
						flexDirection="column"
						// justifyContent="flex-end"
						alignItems={"center"}
						justifyContent={"center"}
					>
						{/* <Progress
							size="xs"
							borderBottomRadius={8}
							isIndeterminate
						/> */}
						<Spinner
							size="xl"
							color="black"
							opacity="0.1"
							mb="4"
							thickness="4px"
						/>
						<Text textAlign="center" w={64} opacity="0.5">
							The foxes, squirrels and sharks are working{" "}
							<span style={{ fontWeight: "700" }}>
								{props.areWorkingXTo}
							</span>{" "}
							to make your picture!
						</Text>
					</Flex>
				</Box>
			) : (
				<>
					<Image
						src={props.src}
						h={props.height}
						style={{ aspectRatio: "1 / 1" }}
						backgroundColor="rgba(0,0,0,0.05)"
						borderRadius={8}
						onClick={onOpen}
						cursor={"pointer"}
						objectFit={"contain"}
					/>
					<Modal
						onClose={onClose}
						isOpen={isOpen}
						isCentered
						size={"4xl"}
					>
						<ModalOverlay />
						<ModalContent
							borderRadius={8}
							background="transparent"
							shadow={"none"}
						>
							{/* <ModalCloseButton color={"white"} /> */}
							<Center
								flexDirection={"column"}
								width={"100%"}
								height={"60vh"}
							>
								<Image
									src={props.src}
									w="100%"
									style={{ aspectRatio: "1 / 1" }}
									backgroundColor={"transparent"}
									borderRadius={8}
									objectFit={"contain"}
								></Image>
								<ButtonGroup
									isAttached
									variant="outline"
									mt={2}
								>
									<Button
										isLoading={downloading}
										loadingText="Downloading"
										leftIcon={<MdDownload />}
										colorScheme={"pink"}
										variant="solid"
										onClick={() => {
											setDownloading(true);
											downloadFile(
												props.src,
												props.prompt + ".png",
											).finally(() => {
												setDownloading(false);
											});
										}}
									>
										Download
									</Button>
									{/* <Button
								leftIcon={<MdCallSplit />}
								variant="outline"
								background={"white"}
								borderColor={"transparent"}
							>
								Variant
							</Button> */}
								</ButtonGroup>
							</Center>
						</ModalContent>
					</Modal>
				</>
			)}
		</Flex>
	);
}
