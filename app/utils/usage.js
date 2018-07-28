
const genesisConfig = {
  base_per_transaction_net_usage: 100,
  base_per_transaction_cpu_usage: 500,
  base_per_action_cpu_usage: 1000,
  base_setcode_cpu_usage: 2097152,
  per_signature_cpu_usage: 100000,
  per_lock_net_usage: 32,
  context_free_discount_cpu_usage_num: 20,
  context_free_discount_cpu_usage_den: 100,
  max_transaction_cpu_usage: 10485760,
  max_transaction_net_usage: 104857,
  max_block_cpu_usage: 104857600,
  target_block_cpu_usage_pct: 1000,
  max_block_net_usage: 1048576,
  target_block_net_usage_pct: 1000,
  max_transaction_lifetime: 3600,
  max_transaction_exec_time: 0,
  max_authority_depth: 6,
  max_inline_depth: 4,
  max_inline_action_size: 4096,
  max_generated_transaction_count: 16
}


// Minimum size for transfer transaction
const minTransactionSize = 147;
const signaturesSize = 65 + 1;

const aproxTxNetUsage = minTransactionSize + signaturesSize + genesisConfig.base_per_transaction_net_usage;


const actionCpuUsage = genesisConfig.base_per_action_cpu_usage + 0 /* TODO: + action.cpu usage investigate */
const signatureCpuUsage = 1 /* signature */ * genesisConfig.per_signature_cpu_usage;

const aproxTxCpuUsage = genesisConfig.base_per_transaction_cpu_usage + actionCpuUsage + signatureCpuUsage;

export default {
  aproxTxCpuUsage,
  aproxTxNetUsage
}