import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Tailwind>
        <Section className="text-center bg-[#DA0037] rounded-xl text-[#EDEDED] p-4 w-full max-w-[600px]">
          <Row>
            <Heading as="h2" className="text-2xl mt-2">
              Hello {username}
            </Heading>
          </Row>
          <Row>
            <Text className="text-xl mt-2">
              Thank you for registration. Please use the following
              <br /> verification code to complete your registration:
            </Text>
          </Row>
          <Row>
            <Text className="text-4xl">{otp}</Text>
          </Row>
          <Row>
            <Text className="text-lg">
              If you did not request this code, please ignore this email.
            </Text>
          </Row>
          <Row>
            <Text>
              <strong>
                <a href="https://honest-opinion.vercel.app" target="_blank">
                  Honest Opinion
                </a>
              </strong>
              &nbsp;developed by&nbsp;
              <strong>
                <a href="https://www.facebook.com/arnabsahawrk" target="_blank">
                  Arnab Saha
                </a>
              </strong>
            </Text>
          </Row>
        </Section>
      </Tailwind>
    </Html>
  );
}
