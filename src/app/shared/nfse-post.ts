export interface NfsePost {
  ambiente: string,
  rps: RpsNfesPost
}
export interface Prestador {
  cpf_cnpj: string
}


export interface Tomador {

  cpf_cnpj: string,
  inscricao_municipal: string,
  nome_razao_social: string,
  fone: string,
  email: string,
  endereco: EnderecoTomador

}

export interface EnderecoTomador {

  logradouro: string,
  numero: string,
  complemento: string,
  bairro: string,
  codigo_municipio: string,
  cidade: string,
  uf: string,
  codigo_pais: string,
  pais: string,
  cep: string

}



export interface Prestador {
  cpf_cnpj: string
}




export interface Prestador {
  cpf_cnpj: string
}




export interface Prestador {
  cpf_cnpj: string
}




export interface Prestador {
  cpf_cnpj: string
}




export interface Prestador {
  cpf_cnpj: string
}




export interface ConstrucaoCivil {
  codigo_obra: string,
  art: string
}


export interface Intermediario {
  cpf_cnpj: string,
  nome_razao_social: string,
  inscricao_municipal: string
}

export interface Servicos {
  iss_retido: true,
  responsavel_retencao: 0,
  item_lista_servico: string,
  codigo_cnae: string,
  codigo_tributacao_municipio: string,
  discriminacao: string,
  codigo_municipio: string,
  codigo_pais: string,
  tipo_tributacao: 0,
  exigibilidade_iss: 0,
  codigo_municipio_incidencia: string,
  numero_processo: string,
  unidade: string,
  quantidade: 0,
  valores: Valores
}

export interface Valores {
  valor_unitario: 0,
  valor_servicos: 0,
  valor_deducoes: 0,
  valor_pis: 0,
  valor_cofins: 0,
  valor_inss: 0,
  valor_ir: 0,
  valor_csll: 0,
  valor_outras_retencoes: 0,
  valor_iss: 0,
  valor_iss_retido: 0,
  valor_liquido: 0,
  aliquota_iss: 0,
  aliquota_pis: 0,
  aliquota_cofins: 0,
  aliquota_inss: 0,
  aliquota_ir: 0,
  aliquota_csll: 0,
  desconto_incondicionado: 0,
  desconto_condicionado: 0
}
export interface RpsNfesPost {
  referencia: string,
  data_emissao: string,
  competencia: string,
  natureza_tributacao: number,

  prestador: Prestador

  tomador: Tomador

  intermediario: Intermediario

  construcao_civil: ConstrucaoCivil


  servicos: Servicos



}
