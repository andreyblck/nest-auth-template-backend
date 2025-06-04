import * as React from "react"
import { 
  Html, 
  Body, 
  Container, 
  Link, 
  Heading, 
  Text, 
  Tailwind,
  Section,
  Hr
} from "@react-email/components"

interface RecoveryTemplateProps {
  domain: string
  token: string
}

export function RecoveryTemplate({
  token,
  domain
}: RecoveryTemplateProps) {
  const confirmationUrl = `${domain}/auth/reset`

  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#6366f1",
                brandDark: "#4f46e5"
              }
            }
          }
        }}
      >
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-8 px-4 max-w-md">
            <Section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-brand to-brandDark rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3 7V17H21V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 7L12 12L21 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <Heading className="text-2xl font-bold text-gray-900 mb-2">
                  Reset password
                </Heading>
                <Text className="text-gray-600 text-base leading-relaxed">
                  Use this reset code
                </Text>
              </div>
              <Section className="mb-6">
                <Text className="text-gray-700 text-base leading-relaxed mb-6">
                  Hello! 👋
                </Text>
                <Text className="text-gray-700 text-base leading-relaxed mb-6">
                  Thank you for signing up! To complete your registration and secure your account, 
                  please click the button below to verify your email address.
                </Text>
                <Text className="text-gray-700 text-base leading-relaxed mb-6">
                  {token}
                </Text>
                <div className="text-center mb-6">
                  <Link 
                    href={confirmationUrl}
                    className="inline-block bg-gradient-to-r from-brand to-brandDark text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-base text-decoration-none"
                  >
                    ✓ Reset password
                  </Link>
                </div>
                <Text className="text-sm text-gray-500 text-center mb-4">
                  Button not working? Copy and paste this link into your browser:
                </Text>
                <Text className="text-xs text-gray-400 text-center break-all bg-gray-50 p-3 rounded border">
                  {confirmationUrl}
                </Text>
              </Section>
              <Hr className="border-gray-200 my-6" />
              <Section>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <Text className="text-sm text-yellow-800 mb-1 font-medium">
                    ⏰ Important:
                  </Text>
                  <Text className="text-sm text-yellow-700">
                    This verification link will expire in 1 hour for security reasons.
                  </Text>
                </div>
                <Text className="text-sm text-gray-500 leading-relaxed">
                  If you didn't create an account with us, you can safely ignore this email. 
                  Your email address will not be added to our system.
                </Text>
              </Section>
            </Section>
            <Section className="text-center">
              <Text className="text-xs text-gray-400 mb-2">
                Thank you for choosing our service! 🚀
              </Text>
              <Text className="text-xs text-gray-400">
                This is an automated message, please do not reply to this email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}