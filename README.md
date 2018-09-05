<p align="center">
  <img src="https://github.com/tarassh/fairy-wallet/blob/master/resources/logo.png" height="128" width="128" />
</p>


[![version](https://img.shields.io/badge/release-v0.9.0-lightgrey.svg)](https://github.com/tarassh/fairy-wallet/releases)

# Fairy Wallet - Ledger Nano S compatible wallet for EOS software.

`Fairy Wallet` is light and secure companion desktop application for Ledger Nano S for EOS software. Application provides basic wallet functionality which allows to controll tokens and initiate transfer for multiple accounts.

![fairy-wallet screenshot](https://github.com/tarassh/fairy-wallet/blob/master/resources/application/Wallet.png)

## Features

- **Hardware Wallet support** Application works with Ledger Nano S hardware wallet. To sign the transaction, application upploads transaction data onto hardware wallet and signing is done internally, so private key is never revealed to the world.
- **Multi account support** Application allows user to switch between EOS accounts if he have such. Accouns should be bounded to public key from hardware wallet.
- **Transfer tokens** Application allows to transfer EOS tokens and generic tokens.
- **Balance Staking** Application allows to stake/unstrake EOS tokens.
- **Airdrop** Apllication allows to track generic tokens that user is interested in.
- **Transaction History** Apllication provides history transaction track.
- **Currency price** Added EOS USD exchange pair.
- **Voting** User can vote up to 30 block producers.
- **Resource Delegation** Application allows to delegate resource to multiple accounts.

## Releases

The latest release version is 0.9.0. To download application use one the following links:

- [for MacOS](https://github.com/tarassh/fairy-wallet/releases/download/v0.9.0/FairyWallet-0.9.0.dmg)
- [for Windows](https://github.com/tarassh/fairy-wallet/releases/download/v0.9.0/FairyWallet.Setup.0.9.0.exe)
- [for Linux](https://github.com/tarassh/fairy-wallet/releases/download/v0.9.0/fairy-wallet_0.9.0_amd64.deb)

Release notes: https://github.com/tarassh/fairy-wallet/releases/tag/v0.9.0


**NOTE**: Wallet on Linux may require additional permitions for the device. To add permitions, use this [script](https://github.com/LedgerHQ/udev-rules/blob/master/add_udev_rules.sh). 
Windows users may expirience slow response from the device due to driver issues.

## Building from source

Please make sure that you have `yarn` preinstalled.
To build binaries from souse follow the intruction below:

```
git clone https://github.com/tarassh/fairy-wallet fairy-wallet
cd fairy-wallet
yarn package
```

## User manual

User manual you can find on [Wiki](https://github.com/tarassh/fairy-wallet/wiki/How-to-use-Ledger-Nano-S-with-Fairy-Wallet) page.

## Connect to Mainnet

To connect to EOS Mainnet you can use one of the following endpoints:

* http://api.cypherglass.com - operated by [Cypherglass](https://www.cypherglass.com)
* https://eos.greymass.com - operated by [Greymass](https://greymass.com)
* https://api.eossweden.se - operated by [Sw/eden](https://eossweden.org)
* https://nodes.eos42.io - operated by [EOS42](https://www.eos42.io)
* http://api-mainnet.starteos.io - operated by [Starteos](https://www.starteos.io)
* https://eosbp.atticlab.net - opeated by [AtticLab](https://atticlab.net)
* https://eu.eosdac.io - operated by [eosDAC](https://eosdac.io)
* https://api1.eosdublin.io - operated by [eosDublin](https://www.eosdublin.com)

## Connect to Testnet

If you want to do testing of this application you can connect to available testnet.

[Jungle Testnet](http://jungle.cryptolions.io/) - operated by [CryptoLions](http://CryptoLions.io/):

* https://jungle.eosio.cr
* http://jungle.cryptolions.io:18888
* http://dev.cryptolions.io:38888

## Debugging mode

```
git clone https://github.com/tarassh/fairy-wallet fairy-wallet
cd fairy-wallet
yarn dev
```
