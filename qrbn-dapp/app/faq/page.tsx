"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  HelpCircle, 
  BookOpen, 
  Users, 
  Utensils,
  ExternalLink,
  Building
} from "lucide-react"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  // Getting Started
  {
    id: "what-is-qrbn",
    question: "What is Tawf Qurban?",
    answer: "Tawf Qurban is Tawf Foundation's blockchain-based qurban project. You choose a goat, a sheep or a share of a cow. It is a preview and is not taking payments yet.",
    category: "Getting Started"
  },
  {
    id: "how-to-connect-wallet",
    question: "How do I connect my wallet?",
    answer: "Click the 'Connect' button in the top navigation. We support MetaMask, WalletConnect, and other popular Web3 wallets. Make sure you're connected to the Lisk Sepolia network to interact with our smart contracts.",
    category: "Getting Started"
  },
  {
    id: "supported-networks",
    question: "Which blockchain networks are supported?",
    answer: "Tawf Qurban was built on the Lisk Sepolia test network. It is a preview and is not taking payments yet.",
    category: "Getting Started"
  },

  // Qurban
  {
    id: "what-is-qurban",
    question: "What is Qurban and how does the digital system work?",
    answer: "Qurban is the ritual sacrifice performed during Eid al-Adha. Tawf Qurban is designed to record each qurban through smart contracts, with an NFT certificate as proof of your participation.",
    category: "Qurban"
  },
  {
    id: "nft-certificate",
    question: "What is the NFT certificate and why do I receive it?",
    answer: "The NFT certificate serves as permanent, immutable proof of your Qurban participation. It contains details about the sacrifice, location, and date. This digital certificate can be stored in your wallet forever as a record of your religious observance.",
    category: "Qurban"
  },

  // Technical Support
  {
    id: "transaction-failed",
    question: "What should I do if my transaction fails?",
    answer: "First, check if you have sufficient USDT and ETH for gas fees. Ensure you're on the correct network (Lisk Sepolia). If the issue persists, try increasing gas fees or contact our support team with the transaction hash for assistance.",
    category: "Technical Support"
  },
  {
    id: "wallet-issues",
    question: "I'm having trouble with my wallet connection",
    answer: "Try refreshing the page, clearing your browser cache, or disconnecting and reconnecting your wallet. Make sure your wallet is set to the Lisk Sepolia network. If using MetaMask, you may need to add the Lisk Sepolia network manually.",
    category: "Technical Support"
  },
  {
    id: "missing-tokens",
    question: "My NFT certificate is not showing in my wallet",
    answer: "Check that you are connected to the Lisk Sepolia network and to the wallet you used. Some wallets need the NFT contract added manually through their import option.",
    category: "Technical Support"
  }
]

const categories = Array.from(new Set(faqData.map(item => item.category)))

const categoryIcons: Record<string, React.ReactNode> = {
  "Getting Started": <HelpCircle className="h-5 w-5" />,
  "Qurban": <Utensils className="h-5 w-5" />,
  "Technical Support": <Building className="h-5 w-5" />
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFAQs = selectedCategory 
    ? faqData.filter(item => item.category === selectedCategory)
    : faqData

  return (
    <div className="min-h-screen bg-tawf-sand/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-medium text-tawf-green mb-4">Frequently Asked Questions</h1>
          <p className="text-tawf-body max-w-2xl mx-auto">
            Everything you need to know about Tawf Qurban. Tawf Qurban is a preview and is not taking payments yet.
          </p>
        </div>

        {/* Category Filter */}
        <Card className="bg-white border-tawf-green/10 rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-tawf-green font-heading flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-tawf-honey" />
              Browse by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "secondary"}
                className={`cursor-pointer transition-colors rounded-full ${
                  selectedCategory === null 
                    ? "bg-tawf-honey text-white hover:bg-tawf-honey/90" 
                    : "bg-tawf-sand/50 text-tawf-ink hover:bg-tawf-sand"
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All Categories ({faqData.length})
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer transition-colors flex items-center gap-1 rounded-full ${
                    selectedCategory === category 
                      ? "bg-tawf-honey text-white hover:bg-tawf-honey/90" 
                      : "bg-tawf-sand/50 text-tawf-ink hover:bg-tawf-sand"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {categoryIcons[category]}
                  {category} ({faqData.filter(item => item.category === category).length})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Accordion */}
        <Card className="bg-white border-tawf-green/10 rounded-2xl mb-8">
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="border-tawf-green/10 bg-tawf-sand/30 rounded-xl px-4"
                >
                  <AccordionTrigger className="text-tawf-ink hover:text-tawf-honey text-left">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="bg-tawf-green/10 text-tawf-green border-tawf-green/20 shrink-0 rounded-full">
                        {faq.category}
                      </Badge>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-tawf-body pt-4 pl-16">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Separator className="bg-tawf-green/10 my-8" />

        {/* Additional Help Section */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-medium text-tawf-green mb-4">Still Need Help?</h2>
          <p className="text-tawf-body mb-6">
            Can't find the answer you're looking for? Get in touch with our support team.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="bg-white border-tawf-green/10 rounded-2xl hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-tawf-gold/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="h-6 w-6 text-tawf-honey" />
                </div>
                <h3 className="text-tawf-green font-heading font-semibold mb-2">Documentation</h3>
                <p className="text-tawf-body text-sm mb-4">
                  Comprehensive guides and technical documentation
                </p>
                <button 
                  onClick={() => window.open("/docs", "_blank")}
                  className="inline-flex items-center gap-2 text-tawf-honey hover:text-tawf-honey/80 text-sm font-medium"
                >
                  View Docs <ExternalLink className="h-3 w-3" />
                </button>
              </CardContent>
            </Card>

            <Card className="bg-white border-tawf-green/10 rounded-2xl hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-tawf-green/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-tawf-green" />
                </div>
                <h3 className="text-tawf-green font-heading font-semibold mb-2">Community Support</h3>
                <p className="text-tawf-body text-sm mb-4">
                  Join our Discord community for help and discussions
                </p>
                <button 
                  onClick={() => window.open("https://discord.gg/UGzzJ8aR4x", "_blank")}
                  className="inline-flex items-center gap-2 text-tawf-honey hover:text-tawf-honey/80 text-sm font-medium"
                >
                  Join Discord <ExternalLink className="h-3 w-3" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
