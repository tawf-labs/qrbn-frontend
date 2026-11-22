"use client"

import { CONTRACT_ADDRESSES, FAUCET_URL, addressUrl } from "@/lib/contracts"
import { truncateAddress } from "@/lib/utils"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Code, 
  Wallet, 
  ExternalLink,
  Copy,
  CheckCircle,
  Utensils,
  Terminal,
  Zap
} from "lucide-react"

interface DocSection {
  id: string
  title: string
  category: string
  icon: React.ReactNode
  content: React.ReactNode
}

const DocSection = ({ section, isActive, onClick }: { 
  section: DocSection; 
  isActive: boolean; 
  onClick: () => void 
}) => (
  <div
    className={`p-4 rounded-xl cursor-pointer transition-all ${
      isActive 
        ? "bg-tawf-honey/10 border-tawf-honey/30 border" 
        : "bg-tawf-sand/30 hover:bg-tawf-sand/50"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <div className="text-tawf-honey">{section.icon}</div>
      <div>
        <h3 className={`font-medium ${isActive ? "text-tawf-honey" : "text-tawf-ink"}`}>
          {section.title}
        </h3>
        <Badge variant="outline" className="bg-tawf-green/10 text-tawf-body border-tawf-green/10 text-xs mt-1">
          {section.category}
        </Badge>
      </div>
    </div>
  </div>
)

const CodeBlock = ({ children, language = "bash" }: { children: string; language?: string }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-tawf-ink px-4 py-2 rounded-t-xl border border-tawf-green/10 rounded-2xl">
        <span className="text-white/80 text-sm font-mono">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-6 px-2 text-white/80 hover:text-tawf-gold"
        >
          {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        </Button>
      </div>
      <pre className="bg-tawf-ink/95 p-4 rounded-b-xl border border-t-0 border-tawf-green/10 overflow-x-auto">
        <code className="text-white text-sm font-mono">{children}</code>
      </pre>
    </div>
  )
}

const docSections: DocSection[] = [
  {
    id: "overview",
    title: "Platform Overview",
    category: "Introduction",
    icon: <BookOpen className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-medium text-tawf-green mb-4">Welcome to Tawf Qurban</h2>
          <p className="text-tawf-body mb-4">
            Tawf Qurban is Tawf Foundation's blockchain-based qurban project, designed to be Sharia-aligned. It is a preview on Arbitrum Sepolia and uses test USDC only.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Card className="bg-tawf-sand/30 border-tawf-green/10 rounded-2xl">
            <CardContent className="p-4">
              <Utensils className="h-8 w-8 text-tawf-honey mb-3" />
              <h3 className="text-tawf-ink font-semibold mb-2">Qurban Offerings</h3>
              <p className="text-tawf-body text-sm">
                Choose a goat, a sheep or a share of a cow, with an NFT certificate as proof.
              </p>
            </CardContent>
          </Card>


        </div>
      </div>
    )
  },
  {
    id: "getting-started",
    title: "Getting Started",
    category: "Quick Start",
    icon: <Zap className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-medium text-tawf-green mb-4">Quick Start Guide</h2>
          <p className="text-tawf-body mb-6">
            Follow these simple steps to start using Tawf Qurban.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-tawf-honey text-white rounded-full flex items-center justify-center font-bold">1</div>
            <div>
              <h3 className="text-tawf-ink font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-tawf-body mb-2">
                Click "Connect" and choose MetaMask or another wallet installed in your browser.
              </p>
              <Badge className="bg-tawf-green/10 text-tawf-ink">Network: Arbitrum Sepolia</Badge>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-tawf-honey text-white rounded-full flex items-center justify-center font-bold">2</div>
            <div>
              <h3 className="text-tawf-ink font-semibold mb-2">Get Test Tokens</h3>
              <p className="text-tawf-body mb-2">
                Get test USDC on Arbitrum Sepolia from Circle's faucet, and a little test ETH for gas.
              </p>
              <Button asChild variant="outline" size="sm" className="border-tawf-honey text-tawf-honey hover:bg-tawf-honey hover:text-white"><a href={FAUCET_URL} target="_blank" rel="noopener noreferrer">Get test USDC <ExternalLink className="h-3 w-3 ml-1" /></a></Button>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-tawf-honey text-white rounded-full flex items-center justify-center font-bold">3</div>
            <div>
              <h3 className="text-tawf-ink font-semibold mb-2">Explore Qurban</h3>
              <p className="text-tawf-body">
                Visit the Qurban page and choose an animal. Tawf Qurban is a preview and uses test USDC only.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "wallet-setup",
    title: "Wallet Setup",
    category: "Web3",
    icon: <Wallet className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-medium text-tawf-green mb-4">Wallet Setup & Configuration</h2>
          <p className="text-tawf-body mb-6">
            Learn how to set up and configure your Web3 wallet for Tawf Qurban.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-heading font-semibold text-tawf-green mb-3">Supported Wallets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-tawf-sand/30 border-tawf-green/10 text-center p-4">
              <h4 className="text-tawf-ink font-medium">MetaMask</h4>
              <p className="text-tawf-body text-sm">Most popular browser extension wallet</p>
            </Card>
            <Card className="bg-tawf-sand/30 border-tawf-green/10 text-center p-4">
              <h4 className="text-tawf-ink font-medium">WalletConnect</h4>
              <p className="text-tawf-body text-sm">Mobile wallet connection protocol</p>
            </Card>
            <Card className="bg-tawf-sand/30 border-tawf-green/10 text-center p-4">
              <h4 className="text-tawf-ink font-medium">Other Wallets</h4>
              <p className="text-tawf-body text-sm">Coinbase Wallet, Trust Wallet, etc.</p>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-heading font-semibold text-tawf-green mb-3">Add the Arbitrum Sepolia network</h3>
          <p className="text-tawf-body mb-4">
            To use Tawf Qurban, add the Arbitrum Sepolia network to your wallet:
          </p>
          <CodeBlock language="json">
{`{
  "chainId": "0x66eee",
  "chainName": "Arbitrum Sepolia",
  "nativeCurrency": {
    "name": "Sepolia Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "rpcUrls": ["https://sepolia-rollup.arbitrum.io/rpc"],
  "blockExplorerUrls": ["https://sepolia.arbiscan.io"]
}`}
          </CodeBlock>
        </div>

      </div>
    )
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    category: "Technical",
    icon: <Code className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-medium text-tawf-green mb-4">Smart Contract Architecture</h2>
          <p className="text-tawf-body mb-6">
            Tawf Qurban uses smart contracts on the Arbitrum Sepolia network.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-heading font-semibold text-tawf-green mb-3">Core Contracts</h3>
          <div className="space-y-4">


            <Card className="bg-tawf-sand/30 border-tawf-green/10 rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-tawf-ink text-base font-heading flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-tawf-honey" />
                  Qurban NFT Contract
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-tawf-body text-sm mb-3">
                  ERC-721 contract for issuing certificates of Qurban participation.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-tawf-body">Address:</span>
                    <a className="text-tawf-honey underline font-mono" href={addressUrl(CONTRACT_ADDRESSES.QurbanNFT)} target="_blank" rel="noopener noreferrer">{truncateAddress(CONTRACT_ADDRESSES.QurbanNFT)}</a>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-tawf-body">Standard:</span>
                    <Badge className="bg-tawf-green/10 text-tawf-ink">ERC-721</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-heading font-semibold text-tawf-green mb-3">Key Functions</h3>
          <div className="space-y-3">
            <CodeBlock language="solidity">
{`// Buy shares of an animal. Approve USDC first.
function purchaseAnimalShares(uint256 _animalId, uint8 _shareAmount) external;`}
            </CodeBlock>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "api-reference",
    title: "API Reference",
    category: "Technical",
    icon: <Terminal className="h-5 w-5" />,
    content: (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-medium text-tawf-green mb-4">Frontend Integration Guide</h2>
          <p className="text-tawf-body mb-6">
            Learn how to integrate Tawf Qurban's functionality into your own applications.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-heading font-semibold text-tawf-green mb-3">Web3 Hooks</h3>
          <p className="text-tawf-body mb-4">
            We provide custom React hooks for easy blockchain integration:
          </p>
          <CodeBlock language="typescript">
{`import { useContracts } from '@/hooks/use-contracts'
import { useAccount } from 'wagmi'

function MyComponent() {
  const { address, isConnected } = useAccount()
  const contracts = useContracts()

  const buy = async (animalId: bigint, pricePerShare: bigint) => {
    if (!contracts || !address) return
    
    try {
      const hash = await contracts.purchaseAnimalShares(animalId, 1, pricePerShare)
      console.log('Transaction hash:', hash)
    } catch (error) {
      console.error('Participation failed:', error)
    }
  }
}`}
          </CodeBlock>
        </div>

        <div>
          <h3 className="text-lg font-heading font-semibold text-tawf-green mb-3">Contract Methods</h3>
          <div className="space-y-4">

            <div>
              <h4 className="text-tawf-ink font-medium mb-2">Qurban Operations</h4>
              <CodeBlock language="typescript">
{`// List the animals: goats, sheep and cows
const animals = await contracts.getQurbanAnimals()

// Buy one share. Approves USDC first if needed
const hash = await contracts.purchaseAnimalShares(animalId, 1, pricePerShare)

// Read a wallet's test USDC balance
const balance = await contracts.getUSDCBalance(address)`}
              </CodeBlock>
            </div>

          </div>
        </div>
      </div>
    )
  }
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")

  const categories = Array.from(new Set(docSections.map(section => section.category)))
  const currentSection = docSections.find(section => section.id === activeSection)

  return (
    <div className="min-h-screen bg-tawf-sand/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-medium text-tawf-green mb-4">Documentation</h1>
          <p className="text-tawf-body max-w-2xl mx-auto">
            Guides, API references, and technical documentation for Tawf Qurban. Tawf Qurban is a preview and uses test USDC only.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-tawf-green/10 sticky top-24">
              <CardHeader>
                <CardTitle className="text-tawf-green font-heading flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-tawf-honey" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categories.map(category => (
                  <div key={category}>
                    <h3 className="text-tawf-honey font-medium text-sm mb-2">{category}</h3>
                    <div className="space-y-2 mb-4">
                      {docSections
                        .filter(section => section.category === category)
                        .map(section => (
                          <DocSection
                            key={section.id}
                            section={section}
                            isActive={activeSection === section.id}
                            onClick={() => setActiveSection(section.id)}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white border-tawf-green/10 rounded-2xl">
              <CardContent className="p-8">
                {currentSection?.content}
              </CardContent>
            </Card>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-8">
              <Button
                variant="outline"
                className="border-tawf-green/10 text-tawf-ink hover:bg-tawf-green/10"
                onClick={() => {
                  const currentIndex = docSections.findIndex(s => s.id === activeSection)
                  if (currentIndex > 0) {
                    setActiveSection(docSections[currentIndex - 1].id)
                  }
                }}
                disabled={docSections.findIndex(s => s.id === activeSection) === 0}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                className="border-tawf-green/10 text-tawf-ink hover:bg-tawf-green/10"
                onClick={() => {
                  const currentIndex = docSections.findIndex(s => s.id === activeSection)
                  if (currentIndex < docSections.length - 1) {
                    setActiveSection(docSections[currentIndex + 1].id)
                  }
                }}
                disabled={docSections.findIndex(s => s.id === activeSection) === docSections.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
