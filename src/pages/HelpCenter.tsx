
import { Shell } from "@/components/Shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhoneCall, Mail, MessageSquare, HelpCircle } from "lucide-react";

const HelpCenter = () => {
  const supportNumber = "+234 801 234 5678";

  return (
    <Shell>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="mt-2 text-muted-foreground">
            Find answers to your questions or contact our support team
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5" />
                <span>Call Support</span>
              </CardTitle>
              <CardDescription>Talk to our customer service team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">{supportNumber}</p>
              <p className="text-sm text-muted-foreground mt-1">Available 9am-5pm WAT, Monday-Friday</p>
              <Button variant="outline" className="mt-4 w-full" onClick={() => window.location.href = `tel:${supportNumber.replace(/\s+/g, '')}`}>
                <PhoneCall className="mr-2 h-4 w-4" />
                Call Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>Email Support</span>
              </CardTitle>
              <CardDescription>Send us a detailed message</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">support@eflow.com</p>
              <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
              <Button variant="outline" className="mt-4 w-full" onClick={() => window.location.href = 'mailto:support@eflow.com'}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-100">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>Chat Support</span>
              </CardTitle>
              <CardDescription>Chat with our virtual assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Get instant answers to common questions</p>
              <Button variant="outline" className="mt-4 w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="w-full mb-10">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
            <TabsTrigger value="guides">User Guides</TabsTrigger>
          </TabsList>
          <TabsContent value="faq">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I invest in a property?</AccordionTrigger>
                <AccordionContent>
                  To invest in a property, browse our properties page, select a property you're interested in, and click on "Invest Now". You'll be guided through the investment process which includes KYC verification and payment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What are the minimum investment amounts?</AccordionTrigger>
                <AccordionContent>
                  The minimum investment amount varies by property but typically starts at ₦50,000. This information is clearly displayed on each property's detail page.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How are returns distributed to investors?</AccordionTrigger>
                <AccordionContent>
                  Returns are distributed quarterly directly to your registered bank account. You can track all your earnings and distributions in the Analytics section.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I sell my investment before the term ends?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can sell your tokens on our secondary marketplace. However, there may be a fee for early exits, and sale is dependent on finding a buyer.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I become a property admin?</AccordionTrigger>
                <AccordionContent>
                  To become a property admin, go to the Admin Application page and complete the application form. Your application will be reviewed by our team, and you'll be notified of the decision.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="guides">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started Guide</CardTitle>
                  <CardDescription>Learn the basics of using E Flow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Our getting started guide covers account creation, verification, browsing properties, and making your first investment.</p>
                  <Button variant="outline" className="mt-4">View Guide</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Investment Guide</CardTitle>
                  <CardDescription>Understanding property investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Learn about property types, investment terms, risk levels, and how to read property performance metrics.</p>
                  <Button variant="outline" className="mt-4">View Guide</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Token Management</CardTitle>
                  <CardDescription>Managing your property tokens</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Understand how to view, transfer, and sell your property tokens, and track your investment performance.</p>
                  <Button variant="outline" className="mt-4">View Guide</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Property Submission</CardTitle>
                  <CardDescription>List your property on E Flow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Learn how to prepare your property documents, submit for review, and manage your listed properties.</p>
                  <Button variant="outline" className="mt-4">View Guide</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 text-center p-6 border-dashed border-2">
          <CardContent className="pt-6">
            <HelpCircle className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is always happy to assist you with any other questions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <Button onClick={() => window.location.href = `tel:${supportNumber.replace(/\s+/g, '')}`}>
                <PhoneCall className="mr-2 h-4 w-4" />
                Call {supportNumber}
              </Button>
              <Button variant="outline" onClick={() => window.location.href = 'mailto:support@eflow.com'}>
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default HelpCenter;
