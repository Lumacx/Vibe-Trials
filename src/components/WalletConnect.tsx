"use client";

import { useState } from 'react';
import { useConnect, useDisconnect, useAccount } from '@starknet-react/core';
import { Button } from '@/components/ui/button'; // Assuming Button component path
import { Wallet } from 'lucide-react'; // Assuming Wallet icon component path

export default function WalletConnect() {
  const { connect, connectors, isPending } = useConnect(); // Corrected: use isPending
  const { disconnect } = useDisconnect();
  const { account } = useAccount();
  // Removed isConnecting state as isPending from useConnect can be used

  const handleConnect = async () => {
    try {
      // Assuming you want to connect to the first available connector
      await connect({ connector: connectors[0] });
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <>
      {account ? (
        <div className="flex items-center bg-primary/10 text-primary-foreground px-4 py-2 rounded-full text-sm sm:text-base cursor-pointer" onClick={handleDisconnect}>
          <Wallet className="w-5 h-5 mr-2" />
          Connected: {account.address.slice(0, 6)}...{account.address?.slice(-4)}
        </div>
      ) : (
        <Button variant="outline" onClick={handleConnect} disabled={isPending}> {/* Corrected: use isPending */}
          {isPending ? 'Connecting...' : 'Connect Wallet'} {/* Corrected: use isPending */}
        </Button>
      )}
    </>
  );
}
