# Fairy Wallet - Ledger Nano S companion wallet for EOS software.

`Fairy Wallet` is light secure companion desktop application for Ledger Nano S internal EOS software. Application provides basic wallet functionality which allows to controll funds and initiate transfer for multiple accounts.

## Features

- **Hard Wallet support** Application works with Ledger Nano S hard wallet. To sign the transaction, application upploads transaction data onto hard wallet and signing is done internally, so private key is never revealed to the world.
- **Multi account support** Application allows user to switch between EOS accounts if they have such. Accouns should be bounded to public key from hard wallet.
- **Transfer funds** Application allows to transfer `eosio.token` contract compatible tokens from user account.
- **Balance Staking** Application allows to stake/unstrake EOS funds.
- **Airdrop** Apllication allows to track `eosio.token` contract compatible tokens that used is interested in.
- **Transaction History** Apllication provides history transaction track.

## Releases

The latest release version 0.2.0. To download application use one the following links:

- [for MacOS](TBD)
- [for Windows](TBD)
- [for Linux](TBD)

## Building from source

Please make sure that you have `yarn` preinstalled.
To build binaries from souse follow the intruction below:

```
git clone https://github.com/tarassh/fairy-wallet fairy-wallet
cd fairy-wallet
yarn package
```

## Connect to Mainnet

To connect to EOS Mainnet you can use one of the following endpoints:

**NOTE**: You may expirience lack of account history as not all listed below endpoints provide it. Enpoints with checked box identifies history availability. 

* [x] https://api.eosnewyork.io - operated by [EOS New York](https://www.eosnewyork.io/)
* [x] https://eos.greymass.com - operated by [greymass](https://greymass.com)
* [ ] https://bp.cryptolions.io - operated by [CryptoLions](http://CryptoLions.io/)
* [ ] https://user-api.eoseoul.io - operated by [EOSeoul](https://portal.eoseoul.io/)
* [x] https://api1.eosdublin.io - operated by [EOS Dublin](https://eosdublin.io)
* [x] https://api2.eosdublin.io - operated by [EOS Dublin](https://eosdublin.io)

## Connect to Testnet

If you want to do testing of this application you can connect to available testnet.

[Jungle Testnet](http://jungle.cryptolions.io/) - operated by [CryptoLions](http://CryptoLions.io/):

* http://jungle.cryptolions.io:18888
* http://dev.cryptolions.io:38888

## Debugging mode

```
git clone https://github.com/tarassh/fairy-wallet fairy-wallet
cd fairy-wallet
yarn dev
```