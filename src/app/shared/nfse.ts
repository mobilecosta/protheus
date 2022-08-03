export interface Nfse {
  id: string
  created_at: "2022-08-02T19:58:36.515Z"
  status: "processando"
  numero: string
  codigo_verificacao: string
  link_url: string
  data_emissao: "2022-08-02T19:58:36.515Z"
  ambiente: "homologacao"
  referencia: string

  declaracao_prestacao_servico: Declaracao_prestacao_servico
  cancelamento: Cancelamento
  mensagens: Mensagens
}

export interface Declaracao_prestacao_servico {
  rps: Rps

  competencia: "2022-08-02"
  natureza_tributacao: 0

  preprestador: Prestador
  tomador: Tomador
  intermediario: Intermediario
  construcao_civil: Construcao_civil
  servicos: Servicos
}

export interface Rps {
  identificacao_rps: Identificacao_rps
  data_emissao: "2022-08-02T19:58:36.516Z"

}

export interface Identificacao_rps {
  numero: string
  serie: string
  tipo: string
}

export interface Prestador {
  cpf_cnpj: string
  inscricao_municipal: string
  nome_razao_social: string
  nome_fantasia: string
  fone: string
  email: string

  endereco: EnderecoPrestador

  optante_simples_nacional: true
  regime_tributacao: 0
  regime_especial_tributacao: 0
  incentivo_fiscal: true
  incentivador_cultural: true

}
export interface EnderecoPrestador {
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  codigo_municipio: string
  cidade: string
  uf: string
  codigo_pais: string
  pais: string
  cep: string

}
export interface Tomador {
  cpf_cnpj: string
  inscricao_municipal: string
  nome_razao_social: string
  fone: string
  email: string


}
export interface Intermediario {
  cpf_cnpj: string
  nome_razao_social: string
  inscricao_municipal: string

}
export interface Construcao_civil {
  codigo_obra: string
  art: string

}
export interface Servicos {
  0: Array_Servicos

}
export interface Array_Servicos {
  iss_retido: true
  responsavel_retencao: 0
  item_lista_servico: string
  codigo_cnae: string
  codigo_tributacao_municipio: string
  discriminacao: string
  codigo_municipio: string
  codigo_pais: string
  tipo_tributacao: 0
  exigibilidade_iss: 0
  codigo_municipio_incidencia: string
  numero_processo: string
  unidade: string
  quantidade: 0

  valores: Valores_Servicos

}

export interface Valores_Servicos {
  valor_unitario: 0
  valor_servicos: 0
  valor_deducoes: 0
  valor_pis: 0
  valor_cofins: 0
  valor_inss: 0
  valor_ir: 0
  valor_csll: 0
  valor_outras_retencoes: 0
  valor_iss: 0
  valor_iss_retido: 0
  valor_liquido: 0
  aliquota_iss: 0
  aliquota_pis: 0
  aliquota_cofins: 0
  aliquota_inss: 0
  aliquota_ir: 0
  aliquota_csll: 0
  desconto_incondicionado: 0
  desconto_condicionado: 0
}
export interface Cancelamento {
  id: string
  status: "pendente"
  data_hora: "2022-08-02T19:58:36.516Z"
  mensagens: Mensagens_Cancelamento
}
export interface Mensagens_Cancelamento {
  0: ArrayMensagens_Cancelamento

}
export interface ArrayMensagens_Cancelamento {
  codigo: string
  descricao: string
  correcao: string
}

export interface Mensagens {
  0: ArrayMensagens_Nfse
}

export interface ArrayMensagens_Nfse {
  codigo: string
  descricao: string
  correcao: string
}