
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface SubmissionResultProps {
  tokensAwarded: number;
}

export const SubmissionResult = ({ tokensAwarded }: SubmissionResultProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600">Submission Successful!</CardTitle>
        <CardDescription>Your property information has been submitted for review.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>You've earned <span className="font-bold">{tokensAwarded}</span> tokens for this submission!</p>
        <p className="text-muted-foreground mt-2">Redirecting to home page...</p>
      </CardContent>
    </Card>
  );
};
