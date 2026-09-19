// React-email
import {
    Html,
    Body,
    Head,
    Heading,
    Hr,
    Container,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

// Variables

type SendPdfEmailProps = {
    invoiceNumber: string;
};

export default function SendPdfEmail({ invoiceNumber }: SendPdfEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>
                Your invoice #{invoiceNumber} is ready for download
            </Preview>
            <Tailwind>
                <Body className="bg-gray-100">
                    <Container>
                        <Section className="bg-white border-black-950 my-10 px-10 py-4 rounded-md">
                            {/* set as text, not an <Img>. Mail clients block
                                remote images by default, so a logo served from
                                the site is a broken frame in most inboxes on
                                first open; the wordmark as type always renders. */}
                            <Text className="m-0 text-lg font-semibold tracking-tight text-black">
                                aayush<span style={{ color: "#8B5CF6" }}>vz</span>
                            </Text>
                            <Heading className="leading-tight">
                                Thanks for using Invoice Generator!
                            </Heading>

                            <Text>
                                We&apos;re pleased to inform you that your
                                invoice{" "}
                                <b>#{invoiceNumber}</b> is ready for download.
                                Please find the attached PDF document.
                            </Text>

                            <Hr />

                            <Text>
                                Best Regards,
                                <br />
                                Aayush Raj
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
