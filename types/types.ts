export type AcoAdiciona = {
    id: number;
};

export type AcoAdicional = {
    aco_na_viga?: boolean | null;
    date_created?: string | null;
    date_updated?: string | null;
    diametro_aco1?: number | Produto | null;
    diametro_aco2?: number | Produto | null;
    diametro_aco3?: number | Produto | null;
    id: number;
    medida_viga_max?: string | null;
    medida_viga_min?: string | null;
    produto?: number | Produto | null;
    quantidade_aco1?: string | null;
    quantidade_aco2?: string | null;
    quantidade_aco3?: string | null;
    sobrecarga_max?: number | null;
    sobrecarga_min?: number | null;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type AcoAdicionalAcoNaViga = {
    aco_adicional_id?: number | AcoAdicional | null;
    id: number;
};

export type ArquivoProjeto = {
    apoio_vao?: number | null;
    apoio_viga?: number | null;
    area_m?: number | null;
    arquivo?: string | DirectusFiles | null;
    comprimento_viga?: number | null;
    date_created?: string | null;
    date_updated?: string | null;
    diametro_aco1?: number | Produto | null;
    diametro_aco2?: number | Produto | null;
    diametro_aco3?: number | Produto | null;
    empresa?: number | Empresa | null;
    enchimento?: number | EnchimentoDaLaje | null;
    engaste_a?: number | null;
    engaste_b?: number | null;
    id: number;
    id_pavimento?: string | null;
    locacao_luminarias?: unknown | null;
    luminaria?: string | null;
    luminaria_viga?: number | null;
    marca_enchimento?: number | Enchimento | null;
    marca_luminaria?: number | Produto | null;
    med_vigas_com_apoio?: number | null;
    met_linear_de_vigas?: number | null;
    nome?: string | null;
    orcamento?: number | Orcamento | null;
    peso_aco?: number | null;
    peso_total?: number | null;
    peso_viga?: number | null;
    preco_aco_adicional?: number | null;
    preco_enchimento?: number | null;
    preco_vigas?: number | null;
    qtd_enchimento?: number | null;
    quantidade_aco1?: number | null;
    quantidade_aco2?: number | null;
    quantidade_aco3?: number | null;
    quantidade_vigas?: number | null;
    sobrecarga?: number | AcoAdicional | null;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    valor_luminaria?: number | null;
    valor_total?: number | null;
    vao?: boolean | null;
    vao_opo_com_apoio?: number | null;
    vao_oposto?: number | null;
    vao_viga?: string | null;
    viga?: number | Produto | null;
    viga_adicional?: number | null;
};

export type CategoriaProduto = {
    date_created?: string | null;
    date_updated?: string | null;
    id: number;
    nome?: string | null;
    slug?: string | null;
    sort?: number | null;
    status?: string | null;
    template?: boolean | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type Cliente = {
    bairro?: string | null;
    cep?: string | null;
    cidade?: string | null;
    complemento?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    documento?: string | null;
    email?: string | null;
    empresa?: number | Empresa | null;
    endereco?: string | null;
    endreco?: string | null;
    estado?: string | null;
    id: number;
    indicador_da_ie?: string | null;
    inscricao_estadual?: string | null;
    nome?: string | null;
    numero?: string | null;
    razao_social?: string | null;
    referencia?: string | null;
    site?: string | null;
    sort?: number | null;
    status?: string | null;
    telefone?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type Contrato = {
    date_created?: string | null;
    date_updated?: string | null;
    empresa?: number | Empresa | null;
    id: number;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type DirectusActivity = {
    action: string;
    collection: string;
    comment?: string | null;
    id: number;
    ip?: string | null;
    item: string;
    origin?: string | null;
    revisions: any[] | DirectusRevisions[];
    timestamp: string;
    user?: string | DirectusUsers | null;
    user_agent?: string | null;
};

export type DirectusCollections = {
    accountability?: string | null;
    archive_app_filter: boolean;
    archive_field?: string | null;
    archive_value?: string | null;
    collapse: string;
    collection: string;
    color?: string | null;
    display_template?: string | null;
    group?: string | DirectusCollections | null;
    hidden: boolean;
    icon?: string | null;
    item_duplication_fields?: unknown | null;
    note?: string | null;
    preview_url?: string | null;
    singleton: boolean;
    sort?: number | null;
    sort_field?: string | null;
    translations?: unknown | null;
    unarchive_value?: string | null;
    versioning: boolean;
};

export type DirectusDashboards = {
    color?: string | null;
    date_created?: string | null;
    icon: string;
    id: string;
    name: string;
    note?: string | null;
    panels: any[] | DirectusPanels[];
    user_created?: string | DirectusUsers | null;
};

export type DirectusExtensions = {
    bundle?: string | null;
    enabled: boolean;
    folder: string;
    id: string;
    source: string;
};

export type DirectusFields = {
    collection: string | DirectusCollections;
    conditions?: unknown | null;
    display?: string | null;
    display_options?: unknown | null;
    field: string;
    group?: string | DirectusFields | null;
    hidden: boolean;
    id: number;
    interface?: string | null;
    note?: string | null;
    options?: unknown | null;
    readonly: boolean;
    required?: boolean | null;
    sort?: number | null;
    special?: unknown | null;
    translations?: unknown | null;
    validation?: unknown | null;
    validation_message?: string | null;
    width?: string | null;
};

export type DirectusFiles = {
    charset?: string | null;
    description?: string | null;
    duration?: number | null;
    embed?: string | null;
    filename_disk?: string | null;
    filename_download: string;
    filesize?: number | null;
    focal_point_x?: number | null;
    focal_point_y?: number | null;
    folder?: string | DirectusFolders | null;
    height?: number | null;
    id: string;
    location?: string | null;
    metadata?: unknown | null;
    modified_by?: string | DirectusUsers | null;
    modified_on: string;
    storage: string;
    tags?: unknown | null;
    title?: string | null;
    type?: string | null;
    uploaded_by?: string | DirectusUsers | null;
    uploaded_on: string;
    width?: number | null;
};

export type DirectusFlows = {
    accountability?: string | null;
    color?: string | null;
    date_created?: string | null;
    description?: string | null;
    icon?: string | null;
    id: string;
    name: string;
    operation?: string | DirectusOperations | null;
    operations: any[] | DirectusOperations[];
    options?: unknown | null;
    status: string;
    trigger?: string | null;
    user_created?: string | DirectusUsers | null;
};

export type DirectusFolders = {
    id: string;
    name: string;
    parent?: string | DirectusFolders | null;
};

export type DirectusMigrations = {
    name: string;
    timestamp?: string | null;
    version: string;
};

export type DirectusNotifications = {
    collection?: string | null;
    id: number;
    item?: string | null;
    message?: string | null;
    recipient: string | DirectusUsers;
    sender?: string | DirectusUsers | null;
    status?: string | null;
    subject: string;
    timestamp?: string | null;
};

export type DirectusOperations = {
    date_created?: string | null;
    flow: string | DirectusFlows;
    id: string;
    key: string;
    name?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    reject?: string | DirectusOperations | null;
    resolve?: string | DirectusOperations | null;
    type: string;
    user_created?: string | DirectusUsers | null;
};

export type DirectusPanels = {
    color?: string | null;
    dashboard: string | DirectusDashboards;
    date_created?: string | null;
    height: number;
    icon?: string | null;
    id: string;
    name?: string | null;
    note?: string | null;
    options?: unknown | null;
    position_x: number;
    position_y: number;
    show_header: boolean;
    type: string;
    user_created?: string | DirectusUsers | null;
    width: number;
};

export type DirectusPermissions = {
    action: string;
    collection: string;
    fields?: unknown | null;
    id: number;
    permissions?: unknown | null;
    presets?: unknown | null;
    role?: string | DirectusRoles | null;
    validation?: unknown | null;
};

export type DirectusPresets = {
    bookmark?: string | null;
    collection?: string | null;
    color?: string | null;
    filter?: unknown | null;
    icon?: string | null;
    id: number;
    layout?: string | null;
    layout_options?: unknown | null;
    layout_query?: unknown | null;
    refresh_interval?: number | null;
    role?: string | DirectusRoles | null;
    search?: string | null;
    user?: string | DirectusUsers | null;
};

export type DirectusRelations = {
    id: number;
    junction_field?: string | null;
    many_collection: string;
    many_field: string;
    one_allowed_collections?: unknown | null;
    one_collection?: string | null;
    one_collection_field?: string | null;
    one_deselect_action: string;
    one_field?: string | null;
    sort_field?: string | null;
};

export type DirectusRevisions = {
    activity: number | DirectusActivity;
    collection: string;
    data?: unknown | null;
    delta?: unknown | null;
    id: number;
    item: string;
    parent?: number | DirectusRevisions | null;
    version?: string | DirectusVersions | null;
};

export type DirectusRoles = {
    admin_access: boolean;
    app_access: boolean;
    description?: string | null;
    enforce_tfa: boolean;
    icon: string;
    id: string;
    ip_access?: unknown | null;
    name: string;
    users: any[] | DirectusUsers[];
};

export type DirectusSessions = {
    expires: string;
    ip?: string | null;
    origin?: string | null;
    share?: string | DirectusShares | null;
    token: string;
    user?: string | DirectusUsers | null;
    user_agent?: string | null;
};

export type DirectusSettings = {
    auth_login_attempts?: number | null;
    auth_password_policy?: string | null;
    basemaps?: unknown | null;
    custom_aspect_ratios?: unknown | null;
    custom_css?: string | null;
    default_appearance: string;
    default_language: string;
    default_theme_dark?: string | null;
    default_theme_light?: string | null;
    id: number;
    mapbox_key?: string | null;
    module_bar?: unknown | null;
    project_color: string;
    project_descriptor?: string | null;
    project_logo?: string | DirectusFiles | null;
    project_name: string;
    project_url?: string | null;
    public_background?: string | DirectusFiles | null;
    public_favicon?: string | DirectusFiles | null;
    public_foreground?: string | DirectusFiles | null;
    public_note?: string | null;
    public_registration: boolean;
    public_registration_email_filter?: unknown | null;
    public_registration_role?: string | null;
    public_registration_verify_email: boolean;
    report_bug_url?: string | null;
    report_error_url?: string | null;
    report_feature_url?: string | null;
    storage_asset_presets?: unknown | null;
    storage_asset_transform?: string | null;
    storage_default_folder?: string | DirectusFolders | null;
    theme_dark_overrides?: unknown | null;
    theme_light_overrides?: unknown | null;
    theming_group: string;
};

export type DirectusShares = {
    collection: string | DirectusCollections;
    date_created?: string | null;
    date_end?: string | null;
    date_start?: string | null;
    id: string;
    item: string;
    max_uses?: number | null;
    name?: string | null;
    password?: string | null;
    role?: string | DirectusRoles | null;
    times_used?: number | null;
    user_created?: string | DirectusUsers | null;
};

export type DirectusTranslations = {
    id: string;
    key: string;
    language: string;
    value: string;
};

export type DirectusUsers = {
    adicionais: string;
    appearance?: string | null;
    auth_data?: unknown | null;
    avatar?: string | DirectusFiles | null;
    cep?: string | null;
    cidade?: string | null;
    contato_1?: string | null;
    contato_2?: string | null;
    cpf?: string | null;
    description?: string | null;
    email?: string | null;
    email_notifications?: boolean | null;
    estado?: string | null;
    external_identifier?: string | null;
    first_name?: string | null;
    id: string;
    language?: string | null;
    last_access?: string | null;
    last_name?: string | null;
    last_page?: string | null;
    location?: string | null;
    password?: string | null;
    provider: string;
    role?: string | DirectusRoles | null;
    status: string;
    tags?: unknown | null;
    tfa_secret?: string | null;
    theme_dark?: string | null;
    theme_dark_overrides?: unknown | null;
    theme_light?: string | null;
    theme_light_overrides?: unknown | null;
    title?: string | null;
    token?: string | null;
};

export type DirectusVersions = {
    collection: string | DirectusCollections;
    date_created?: string | null;
    date_updated?: string | null;
    hash?: string | null;
    id: string;
    item: string;
    key: string;
    name?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type DirectusWebhooks = {
    actions: unknown;
    collections: unknown;
    data: boolean;
    headers?: unknown | null;
    id: number;
    method: string;
    migrated_flow?: string | null;
    name: string;
    status: string;
    url: string;
    was_active_before_deprecation: boolean;
};

export type Empresa = {
    ambiente_mdfe?: string | null;
    ambiente_nfce?: string | null;
    ambiente_nfe?: string | null;
    arquivo_certificado?: string | DirectusFiles | null;
    bairro?: string | null;
    cep?: string | null;
    certificado: string;
    cidade?: string | null;
    codigo_cidade?: string | null;
    complemento?: string | null;
    contato?: string | null;
    csc?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    DFe: string;
    documento?: string | null;
    email?: string | null;
    endereco?: string | null;
    endereco_entrega?: string | null;
    estado?: string | null;
    id: number;
    identificador_do_csc?: string | null;
    inscricao_estadual?: string | null;
    inscricao_municipal?: string | null;
    logo?: string | DirectusFiles | null;
    MDFe: string;
    NFCe: string;
    NFe: string;
    nome?: string | null;
    numero?: string | null;
    numero_sequencial?: string | null;
    obs?: string | null;
    proxima_nota_nfce?: string | null;
    proxima_nota_nfe?: string | null;
    proximo_mdfe?: string | null;
    razao_social?: string | null;
    referencia?: string | null;
    regime_fiscal?: string | null;
    senha_certificado?: string | null;
    serie_mdfe?: string | null;
    serie_nfce?: string | null;
    serie_nfe?: string | null;
    sort?: number | null;
    status?: string | null;
    tipo?: string | null;
    ultimo_nsu?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    whatsapp?: string | null;
};

export type Enchimento = {
    a?: number | null;
    b?: number | null;
    c?: number | null;
    d?: number | null;
    date_created?: string | null;
    date_updated?: string | null;
    id: number;
    marca?: string | null;
    produto?: number | Produto | null;
    sort?: number | null;
    tipo_densidade?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type EnchimentoDaLaje = {
    date_created?: string | null;
    date_updated?: string | null;
    id: number;
    material?: string | null;
    nome?: string | null;
    sort?: number | null;
    status?: string | null;
    template?: boolean | null;
    tipo?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type Fornecedor = {
    bairro?: string | null;
    cep?: string | null;
    cidade?: string | null;
    complemento?: string | null;
    dados_endereco: string;
    date_created?: string | null;
    date_updated?: string | null;
    documento?: string | null;
    email?: string | null;
    empresa?: number | Empresa | null;
    endereco?: string | null;
    estado?: string | null;
    id: number;
    ie?: string | null;
    indicador_ie?: string | null;
    nome?: string | null;
    numero?: string | null;
    razao_social?: string | null;
    referencia?: string | null;
    site?: string | null;
    sort?: number | null;
    status?: string | null;
    telefone?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type Item = {
    date_created?: string | null;
    date_updated?: string | null;
    desconto?: number | null;
    id: number;
    produto?: number | Produto | null;
    quantidade?: number | null;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    valor?: number | null;
};

export type ItemNota = {
    cfop?: string | null;
    cst?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    desconto?: number | null;
    id: number;
    ncm?: string | null;
    produto?: number | Produto | null;
    quantidade?: number | null;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    valor?: number | null;
};

export type ItemOrdemCompra = {
    cfop?: string | null;
    id: number;
    ncm?: string | null;
    produto?: string | null;
    quantidade?: number | null;
    situacao_tributaria?: string | null;
    unidade?: string | null;
    valor?: number | null;
    valor_compra?: number | null;
};

export type Motorista = {
    bairro?: string | null;
    cep?: string | null;
    cidade?: string | null;
    complemento?: string | null;
    dados_endereco: string;
    date_created?: string | null;
    date_updated?: string | null;
    documento?: string | null;
    empresa?: number | Empresa | null;
    endereco?: string | null;
    estado?: string | null;
    id: number;
    nome?: string | null;
    numero?: string | null;
    referencia?: string | null;
    sort?: number | null;
    status?: string | null;
    telefone?: string | null;
    tipo?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    veiculo?: number | VeiculoReboque | null;
};

export type NotaFiscal = {
    ambiente?: string | null;
    chave?: string | null;
    codigo_status?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    documento?: number | Orcamento | null;
    id: number;
    itens: any[] | NotaFiscalItemNota[];
    modelo?: string | null;
    numero?: string | null;
    serie?: string | null;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type NotaFiscalItemNota = {
    id: number;
    item_nota_id?: number | ItemNota | null;
    nota_fiscal_id?: number | NotaFiscal | null;
};

export type Orcamento = {
    cep?: string | null;
    chave?: string | null;
    cidade?: string | null;
    cliente?: string | DirectusUsers | null;
    como_sera_pago?: string | null;
    complemento?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    distancia?: number | null;
    empresa?: number | Empresa | null;
    enchimento?: number | Fornecedor | null;
    endereco_completo?: string | null;
    endereco_obra: string;
    entrada?: number | null;
    estado?: string | null;
    execucao_aproximada?: string | null;
    forma_pagamento?: string | null;
    forma_pagamento_entrada?: string | null;
    fornecedor: string;
    id: number;
    informacoes_complementates?: boolean | null;
    nota?: boolean | null;
    obs_entrega?: string | null;
    parcelas?: number | null;
    parcelas_entrada?: string | null;
    pavimento?: number | ArquivoProjeto | null;
    prazo_final?: string | null;
    prazo_inicial?: string | null;
    prazo_max?: string | null;
    prazo_min?: string | null;
    produtos: any[] | OrcamentoProduto[];
    qual_tipo_pvto?: string | null;
    quantidade_frete?: number | null;
    responsavel?: string | null;
    sera_realizado?: string | null;
    sort?: number | null;
    status?: string | null;
    step?: number | null;
    telefone?: string | null;
    tipo_obra?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    valor?: number | null;
    valor_frete?: number | null;
    vigas?: number | Fornecedor | null;
};

export type OrcamentoProduto = {
    id: number;
    orcamento_id?: number | Orcamento | null;
    produto_id?: number | Produto | null;
};

export type OrdemCompra = {
    date_created?: string | null;
    date_updated?: string | null;
    empresa?: number | Empresa | null;
    fornecedor?: number | Fornecedor | null;
    frete?: unknown | null;
    id: number;
    pagamento?: unknown | null;
    pagamentos?: unknown | null;
    produtos: any[] | OrdemCompraItemOrdemCompra[];
    sort?: number | null;
    status?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    valor_total?: number | null;
    vendedor?: string | Vendedor | null;
};

export type OrdemCompraItemOrdemCompra = {
    id: number;
    item_ordem_compra_id?: number | ItemOrdemCompra | null;
    ordem_compra_id?: number | OrdemCompra | null;
};

export type OrdemServico = {
    date_created?: string | null;
    date_updated?: string | null;
    id: number;
    sort?: number | null;
    status: string;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type Produto = {
    bombeamento_de_concreto: string;
    categoria?: number | CategoriaProduto | null;
    cest?: string | null;
    cfop?: string | null;
    codigo_enquadramento_ipi?: string | null;
    codigo_ncm?: string | null;
    cofins: string;
    composicao: any[] | ProdutoProdutoComposicao[];
    comprimento?: string | null;
    concreto_usinado: string;
    custo_por_km?: number | null;
    dados_aco: string;
    dados_do_enchimento: string;
    dados_eps: string;
    dados_laje: string;
    date_created?: string | null;
    date_updated?: string | null;
    diamentro?: string | null;
    diametro_do_aco?: string | null;
    empresa?: number | Empresa | null;
    empresa_faz_sarrafeamento_do_concreto?: string | null;
    enchimento?: number | EnchimentoDaLaje | null;
    fck_concreto?: string | null;
    fiscal: string;
    geral: string;
    icms: string;
    id: number;
    ipi: string;
    largura_sapa_viga?: number | null;
    limite_de_m_bombeado_sem_taxa_extra?: number | null;
    limite_de_sarrafeamento?: number | null;
    m_maxima_de_transporte?: string | null;
    marca?: string | null;
    nome?: string | null;
    obs?: string | null;
    origem?: string | null;
    origem_mercadoria_icms?: string | null;
    origem_mercadoria_ipi?: string | null;
    peso?: string | null;
    peso_por_metro_linear?: number | null;
    pis: string;
    polido?: string | null;
    prazo_de_entrega?: number | null;
    preco_m_linear?: number | null;
    preco_m_trelica_sapata?: number | null;
    preco_por_m?: number | null;
    preco_por_peca?: number | null;
    quantidade?: number | null;
    quantidade_atacado?: number | null;
    situacao_tributaria?: string | null;
    situacao_tributaria_cofins?: string | null;
    situacao_tributaria_pis?: string | null;
    sort?: number | null;
    status?: string | null;
    taxa_bombeamento_por_m_excedente?: number | null;
    taxa_de_entrega?: number | null;
    taxa_de_sarrafeamento_por_m_excedente?: number | null;
    taxa_minima_de_bombeamento?: number | null;
    taxa_minima_de_sarrafeamento?: number | null;
    tipo_aco?: number | TipoAco | null;
    tipo_agregado?: string | null;
    tipo_do_slamp?: string | null;
    tipo_laje?: string | null;
    tipo_peca?: string | null;
    tipo_produto?: string | null;
    tipo_slamp?: string | null;
    tipo_trelica?: number | TipoTrelica | null;
    unidade?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
    utilizacao?: string | null;
    valor_atacado?: number | null;
    valor_compra?: number | null;
    valor_venda?: number | null;
};

export type ProdutoComposicao = {
    date_created?: string | null;
    date_updated?: string | null;
    id: number;
    produto?: number | Produto | null;
    quantidade?: number | null;
    sort?: number | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type ProdutoEnchimento = {
    enchimento_id?: number | Enchimento | null;
    id: number;
    produto_id?: number | Produto | null;
};

export type ProdutoEnchimentoDaLaje = {
    enchimento_da_laje_id?: number | EnchimentoDaLaje | null;
    id: number;
    produto_id?: number | Produto | null;
};

export type ProdutoProdutoComposicao = {
    id: number;
    produto_composicao_id?: number | ProdutoComposicao | null;
    produto_id?: number | Produto | null;
};

export type TipoAco = {
    date_created?: string | null;
    date_updated?: string | null;
    id: number;
    nome?: string | null;
    sort?: number | null;
    status?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type TipoTrelica = {
    date_created?: string | null;
    date_updated?: string | null;
    id: number;
    nome?: string | null;
    sort?: number | null;
    status?: string | null;
    template?: boolean | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type VeiculoReboque = {
    capacidade_kg?: string | null;
    capacidade_m3?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    documento?: string | null;
    estado?: string | null;
    estado_proprietario?: string | null;
    id: number;
    ie?: string | null;
    placa?: string | null;
    propriedade: string;
    razao_social?: string | null;
    renavam?: string | null;
    rntc?: string | null;
    sort?: number | null;
    status?: string | null;
    tara?: string | null;
    tipo_de_carroceria?: string | null;
    tipo_de_proprietario?: string | null;
    tipo_de_rodado?: string | null;
    tipo_de_veiculo?: string | null;
    tipo_propriedade?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type Vendedor = {
    bairro?: string | null;
    cep?: string | null;
    cidade?: string | null;
    comissao?: number | null;
    complemento?: string | null;
    date_created?: string | null;
    date_updated?: string | null;
    email?: string | null;
    endereco?: string | null;
    estado?: string | null;
    id: string;
    nome?: string | null;
    numero?: string | null;
    referencia?: string | null;
    sort?: number | null;
    status?: string | null;
    telefone?: string | null;
    user_created?: string | DirectusUsers | null;
    user_updated?: string | DirectusUsers | null;
};

export type CustomDirectusTypes = {
    aco_adiciona: AcoAdiciona[];
    aco_adicional: AcoAdicional[];
    aco_adicional_aco_na_viga: AcoAdicionalAcoNaViga[];
    arquivo_projeto: ArquivoProjeto[];
    categoria_produto: CategoriaProduto[];
    cliente: Cliente[];
    contrato: Contrato[];
    directus_activity: DirectusActivity[];
    directus_collections: DirectusCollections[];
    directus_dashboards: DirectusDashboards[];
    directus_extensions: DirectusExtensions[];
    directus_fields: DirectusFields[];
    directus_files: DirectusFiles[];
    directus_flows: DirectusFlows[];
    directus_folders: DirectusFolders[];
    directus_migrations: DirectusMigrations[];
    directus_notifications: DirectusNotifications[];
    directus_operations: DirectusOperations[];
    directus_panels: DirectusPanels[];
    directus_permissions: DirectusPermissions[];
    directus_presets: DirectusPresets[];
    directus_relations: DirectusRelations[];
    directus_revisions: DirectusRevisions[];
    directus_roles: DirectusRoles[];
    directus_sessions: DirectusSessions[];
    directus_settings: DirectusSettings;
    directus_shares: DirectusShares[];
    directus_translations: DirectusTranslations[];
    directus_users: DirectusUsers[];
    directus_versions: DirectusVersions[];
    directus_webhooks: DirectusWebhooks[];
    empresa: Empresa[];
    enchimento: Enchimento[];
    enchimento_da_laje: EnchimentoDaLaje[];
    fornecedor: Fornecedor[];
    item: Item[];
    item_nota: ItemNota[];
    item_ordem_compra: ItemOrdemCompra[];
    motorista: Motorista[];
    nota_fiscal: NotaFiscal[];
    nota_fiscal_item_nota: NotaFiscalItemNota[];
    orcamento: Orcamento[];
    orcamento_produto: OrcamentoProduto[];
    ordem_compra: OrdemCompra[];
    ordem_compra_item_ordem_compra: OrdemCompraItemOrdemCompra[];
    ordem_servico: OrdemServico[];
    produto: Produto[];
    produto_composicao: ProdutoComposicao[];
    produto_enchimento: ProdutoEnchimento[];
    produto_enchimento_da_laje: ProdutoEnchimentoDaLaje[];
    produto_produto_composicao: ProdutoProdutoComposicao[];
    tipo_aco: TipoAco[];
    tipo_trelica: TipoTrelica[];
    veiculo_reboque: VeiculoReboque[];
    vendedor: Vendedor[];
};
