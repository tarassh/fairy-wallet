<p align="center">
  <img src="https://github.com/tarassh/fairy-wallet/blob/master/resources/logo.png" height="128" width="128" />
</p>

[![version](https://img.shields.io/badge/release-0.9.6-lightgrey.svg)](https://github.com/tarassh/fairy-wallet/releases)

# Fairy Wallet - Ledger Nano S compatible wallet for EOS

`Fairy Wallet` is a light and secure desktop application for the Ledger Nano S and EOS blockchain. The application provides basic wallet functionality that allows the control and transfer of tokens using multiple accounts.

![fairy-wallet screenshot](https://github.com/tarassh/fairy-wallet/blob/master/resources/application/Wallet.png)

## Features

- **Hardware Wallet Support** Application works with Ledger Nano S hardware wallet. To sign the transaction, application uploads transaction data onto hardware wallet and signing is done internally, so the private key is never revealed to the world.
- **Multi Account Support** Application allows user to switch between EOS accounts. Accounts should be bound to the public key on the hardware wallet.
- **Transfer Tokens** Application allows the transfer of EOS and generic tokens.
- **Balance Staking** Application allows the user to stake/unstake EOS tokens.
- **Airdrop** Application allows the tracking of generic tokens that user is interested in.
- **Transaction History** Application provides transaction history.
- **Currency Price** Added EOS USD exchange pair.
- **Voting** User can vote up to 30 block producers.
- **Resource Delegation** Application allows to delegate resource to multiple accounts.

## Releases

The latest release version is 0.9.6. To download the application use one the following links:

- [for MacOS](https://github.com/tarassh/fairy-wallet/releases/download/v0.9.6/FairyWallet-0.9.6.dmg)
- [for Windows](https://github.com/tarassh/fairy-wallet/releases/download/v0.9.6/FairyWallet.Setup.0.9.6.exe)
- [for Linux](https://github.com/tarassh/fairy-wallet/releases/download/v0.9.6/fairy-wallet_0.9.6_amd64.deb)

Release notes: https://github.com/tarassh/fairy-wallet/releases/tag/v0.9.6

**NOTE**: Wallet on Linux may require additional permissions for the device. To add permissions, use this [script](https://github.com/LedgerHQ/udev-rules/blob/master/add_udev_rules.sh). 
Windows users may experience slow response from the device due to driver issues.

## Building from Source

Please make sure that you have `yarn` preinstalled.
To build binaries from source follow the instructions below:

```
git clone https://github.com/tarassh/fairy-wallet
cd fairy-wallet
yarn
yarn package
```

## User Manual

User manual can be found on the [Wiki](https://github.com/tarassh/fairy-wallet/wiki/How-to-use-Ledger-Nano-S-with-Fairy-Wallet) page.

## Connect to Mainnet

Connect to the EOS Mainnet using one of the following endpoints:

* http://api.cypherglass.com - operated by [Cypherglass](https://www.cypherglass.com)
* https://eos.greymass.com - operated by [Greymass](https://greymass.com)
* https://api.eossweden.se - operated by [Sw/eden](https://eossweden.org)
* https://nodes.eos42.io - operated by [EOS42](https://www.eos42.io)
* http://api-mainnet.starteos.io - operated by [Starteos](https://www.starteos.io)
* https://eosbp.atticlab.net - opeated by [AtticLab](https://atticlab.net)
* https://eu.eosdac.io - operated by [eosDAC](https://eosdac.io)
* https://api1.eosdublin.io - operated by [eosDublin](https://www.eosdublin.com)

## Connect to Testnet

Connect to the EOS Testnet for testing this application.

[Jungle Testnet](http://jungle.cryptolions.io/) - operated by [CryptoLions](http://CryptoLions.io/):

* http://jungle.cryptolions.io:18888
* http://dev.cryptolions.io:38888

## Development Mode

```
git clone https://github.com/tarassh/fairy-wallet
cd fairy-wallet
yarn
yarn dev
```
