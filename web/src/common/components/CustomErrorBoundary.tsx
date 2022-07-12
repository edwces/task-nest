import { Button, Center, Container, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

interface CustomErrorBoundaryProps {
  children: ReactNode;
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Container fluid sx={{ height: "100vh" }}>
      <Center sx={{ height: "100vh" }}>
        <Stack align={"center"}>
          <Text>Unfortunately Something went wrong</Text>
          <Button onClick={resetErrorBoundary}>Refresh Page</Button>
        </Stack>
      </Center>
    </Container>
  );
}

export function CustomErrorBoundary({ children }: CustomErrorBoundaryProps) {
  const router = useRouter();

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => router.reload()}
    >
      {children}
    </ErrorBoundary>
  );
}
