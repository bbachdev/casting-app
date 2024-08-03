import ContentContainer from '@/components/layout/ContentContainer';
import { redirect } from "next/navigation";
import { validateRequest } from '@/actions/auth';

export default async function Dashboard() {
  const { user } = await validateRequest()
  if (!user) {
    redirect('/signin')
  }

  return (
    <ContentContainer>
      Dashboard
    </ContentContainer>
  )
}