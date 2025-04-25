import ZapierChatbot from '@/components/ZapierChatbot'
import React from 'react'
import { DoubtSolver } from '@/components/DoubtSolver';

const page = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-8">
            Padho AI Doubt Solver
          </h1>
          <p className="text-center mb-12 text-lg">
            Ask any question and get instant answers powered by Padho AI
          </p>

          <DoubtSolver />
        </div>
      </main>
      <div className="w-screen h-screen">
        <ZapierChatbot />
      </div>
    </>
  );
}

export default page
