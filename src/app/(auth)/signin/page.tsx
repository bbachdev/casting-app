import ContentContainer from '@/components/layout/ContentContainer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function SignIn() {
  return (
    <ContentContainer>
      <Card className={`mt-12 mx-auto flex flex-col items-center justify-center w-1/3`}>
        <CardHeader>
          <h1 className={`text-3xl font-bold`}>Sign In</h1>
        </CardHeader>
        <CardContent>
          <p>Sign in to your account</p>
        </CardContent>
        <CardFooter>
          <p>{`Don't have an account? `}<a href="/signup" className={`text-sky-950`}>Sign Up</a></p>
        </CardFooter>
      </Card>
    </ContentContainer>
  )
}