export interface Certificado {
  certificado: string;
  password: string;
}

export interface Nfe {
  ambiente: string;
}
export interface Mdfe {
  ambiente: string;
}
export interface Cte {
  ambiente: string;
}
export interface Cte_os {
  ambiente: string;
}
export interface Prefeitura {
  login: string;
  senha: string;
  token: string;
}

export interface Rps {
  lote: number;
  serie: string;
  numero: number;
}

export interface Nfse {
  rps: Rps;
  prefeitura: Prefeitura;
  ambiente: string;
}
export interface Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  codigo_municipio: string;
  cidade: string;
  uf: string;
  codigo_pais: string;
  pais: string;
  cep: string;
}

export interface Empresa {
  data: Empresa;
  cpf_cnpj: string;
  inscricao_estadual: string;
  inscricao_municipal: string;
  nome_razao_social: string;
  nome_fantasia: string;
  fone: string;
  email: string;
  status: string;

  endereco: Endereco;

  optante_simples_nacional: boolean;
  regime_tributacao: 0;
  regime_especial_tributacao: 0;
  incentivo_fiscal: boolean;
  incentivador_cultural: boolean;

  nfe: Nfe;
  mdfe: Mdfe;
  cte: Cte;
  cte_os: Cte_os;
  nfse: Nfse;
}