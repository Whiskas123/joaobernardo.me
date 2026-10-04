/* ============================================================================
   joaobernardo.me — FICHEIRO ÚNICO
   ----------------------------------------------------------------------------
   Tudo o que aparece nas três páginas (pt / en / es) vem daqui.
   As páginas index.html, en/index.html e es/index.html são GERADAS a partir
   deste ficheiro por build.js — não as edites à mão. No push o GitHub gera-as
   sozinho; para ver em local depois de mudar algo aqui: `node build.js`.

   ── COMO ADICIONAR UM PROJETO ──────────────────────────────────────────────
   Copia um bloco da lista `projects` e muda os campos. Só `id`, `shelf`,
   `year`, `title` e `url` são obrigatórios. A lista é ordenada sozinha por
   ano (mais recente primeiro) — não é preciso pôr na ordem certa.

   ── CAMPOS ─────────────────────────────────────────────────────────────────
   id            texto curto, único. Só para referência.
   shelf         'projetos' ou 'textos' (ver `shelves` mais abaixo)
   year          número. Ordena a lista.
   flagship      true põe uma ★ ao lado do título. Usa com parcimónia.
   title         "texto" se for igual nas três línguas,
                 ou { pt: "...", en: "...", es: "..." } se mudar
   url           idem — "texto" ou { pt, en, es }
   type          o tipo de projeto que aparece na linha. "texto" ou { pt, en, es }
   venue         opcional. Onde saiu (Público, FFMS, Routledge…). Aparece
                 a seguir ao tipo. Apaga o campo e desaparece.
   thumb         opcional. Imagem que aparece ao passar o rato.
   pile          opcional. `pile: true` põe o projeto na pilha que roda
                 sozinha. Sem este campo o projeto fica fora dela: continua
                 na lista, e a imagem aparece ao passar o rato e no popup.
   description   o texto curto do hover. MÁXIMO DUAS LINHAS — mais do que isso
                 passa por cima das bolhas. { pt, en, es }
   modal         opcional. Texto mais longo, só aparece no popup. { pt, en, es }
   gallery       opcional. Lista de fotografias para o popup.
   awards        opcional. Prémios: texto simples no hover, links no popup.
   ============================================================================ */

window.SITE = {

	/* ── Opções ───────────────────────────────────────────────────────────── */
	config: {
		// true = os projetos com ★ sobem todos para o topo da sua secção.
		// false = a lista é puramente por ano (mais recente primeiro).
		flagshipsFirst: false,

		// O que a metade esquerda mostra antes de alguém passar o rato:
		// 'none' = nada · 'featured' = o projeto ★ mais recente com miniatura
		// 'stack' = uma pilha que vai passando por todos os projetos com
		// miniatura, com os seguintes a espreitar por baixo.
		idlePreview: 'stack',
	},

	/* ── Secções ──────────────────────────────────────────────────────────────
	   Para criar uma secção nova (ex.: "Conversas"), acrescenta um bloco aqui
	   e usa o `id` no campo `shelf` dos projetos. O minidisco 3 está livre.   */
	shelves: [
		{
			id: 'projetos',
			disc: '/assets/images/minidisc1.webp',
			tilt: '9.4deg',
			tiltHover: '-6.6deg',
			name: { pt: 'Projetos', en: 'Projects', es: 'Proyectos' },
		},
		{
			id: 'textos',
			disc: '/assets/images/minidisc2.webp',
			tilt: '-13.3deg',
			tiltHover: '6.7deg',
			name: { pt: 'Publicações', en: 'Publications', es: 'Publicaciones' },
		},
	],

	/* ── Texto da página ──────────────────────────────────────────────────── */
	ui: {
		pt: {
			hello: 'Olá',
			blurb: 'Chamo-me <b>João Bernardo Narciso</b> e trabalho em visualização de dados. Faço ensaios visuais, exposições, artigos académicos e, de vez em quando, de opinião. Quase sempre com dados.',
			// Texto para o Google e para as pré-visualizações de links. Sem HTML.
			description: 'João Bernardo Narciso trabalha em visualização de dados. Faz ensaios visuais, exposições, artigos académicos e, de vez em quando, de opinião. Quase sempre com dados.',
			linksLabel: 'Links',
			listLabel: 'Projetos e publicações',
			flagshipLabel: 'Projeto principal',
			open: 'Abrir',
			close: 'Fechar',
			gallery: 'Fotografias do projeto',
			galleryPrev: 'Fotografia anterior',
			galleryNext: 'Fotografia seguinte',
			prevProject: 'Projeto anterior',
			nextProject: 'Projeto seguinte',
		},
		en: {
			hello: 'Hi',
			blurb: 'My name is <b>João Bernardo Narciso</b> and I work in data visualization. I make visual essays, exhibitions, academic papers and, every now and then, opinion pieces. Almost always with data.',
			description: 'João Bernardo Narciso works in data visualization. He makes visual essays, exhibitions, academic papers and, every now and then, opinion pieces. Almost always with data.',
			linksLabel: 'Links',
			listLabel: 'Projects and publications',
			flagshipLabel: 'Main project',
			open: 'Open',
			close: 'Close',
			gallery: 'Project photographs',
			galleryPrev: 'Previous photograph',
			galleryNext: 'Next photograph',
			prevProject: 'Previous project',
			nextProject: 'Next project',
		},
		es: {
			hello: 'Hola',
			blurb: 'Me llamo <b>João Bernardo Narciso</b> y trabajo en visualización de datos. Hago ensayos visuales, exposiciones, artículos académicos y, de vez en cuando, de opinión. Casi siempre con datos.',
			description: 'João Bernardo Narciso trabaja en visualización de datos. Hace ensayos visuales, exposiciones, artículos académicos y, de vez en cuando, de opinión. Casi siempre con datos.',
			linksLabel: 'Enlaces',
			listLabel: 'Proyectos y publicaciones',
			flagshipLabel: 'Proyecto principal',
			open: 'Abrir',
			close: 'Cerrar',
			gallery: 'Fotografías del proyecto',
			galleryPrev: 'Fotografía anterior',
			galleryNext: 'Fotografía siguiente',
			prevProject: 'Proyecto anterior',
			nextProject: 'Proyecto siguiente',
		},
	},

	/* ── Projetos ─────────────────────────────────────────────────────────── */
	projects: [

		{
			id: 'tele-textual',
			pile: true,
			shelf: 'projetos',
			year: 2026,
			flagship: true,
			title: 'Tele-textual',
			url: {
				pt: 'https://teletext.joaobernardo.me',
				en: 'https://teletext.joaobernardo.me/en',
				es: 'https://teletext.joaobernardo.me/en',
			},
			type: { pt: 'instalação e site', en: 'installation and website', es: 'instalación y página web' },
			thumb: '/assets/images/thumbnails/teletextual.webp',
			description: {
				pt: 'Uma instalação participativa construída sobre o arquivo do teletexto português.',
				en: 'A participatory installation built on the Portuguese teletext archive.',
				es: 'Una instalación participativa construida sobre el archivo del teletexto portugués.',
			},
			modal: {
				pt: 'Um arquivo vivo de páginas do teletexto da RTP e da SIC. Qualquer pessoa pode também criar páginas novas, dentro das restrições de uma tecnologia (aparentemente) obsoleta.',
				en: 'A living archive of teletext pages from RTP and SIC. Anyone can also create new pages, within the constraints of an (apparently) obsolete technology.',
				es: 'Un archivo vivo de páginas del teletexto de RTP y SIC. Cualquier persona puede además crear páginas nuevas, dentro de las restricciones de una tecnología (aparentemente) obsoleta.',
			},
		},

		{
			id: 'constelacoes',
			pile: true,
			shelf: 'projetos',
			year: 2025,
			flagship: true,
			title: 'Constelações Parlamentares',
			url: 'https://parliament.joaobernardo.me',
			type: {
				pt: 'exposição',
				en: 'exhibition',
				es: 'exposición',
			},
			thumb: '/assets/images/thumbnails/constelacoes.webp',
			description: {
				pt: 'Exposição sobre as votações do Parlamento Europeu desde 2004, redesenhadas como redes.',
				en: 'Exhibition on every European Parliament roll-call vote since 2004, redrawn as networks.',
				es: 'Exposición sobre las votaciones del Parlamento Europeo desde 2004, redibujadas como redes.',
			},
			modal: {
				pt: 'Todas as votações nominais do Parlamento Europeu desde 2004, redesenhadas como redes, em que dois eurodeputados ficam mais próximos quanto mais semelhantes forem as suas votações. A exposição está em itinerância no Festival Política.',
				en: 'Every roll-call vote of the European Parliament since 2004, redrawn as networks, in which two MEPs sit closer together the more alike their votes are. The exhibition is touring with Festival Política.',
				es: 'Todas las votaciones nominales del Parlamento Europeo desde 2004, redibujadas como redes, en las que dos eurodiputados quedan más cerca cuanto más parecidas son sus votaciones. La exposición está en itinerancia en el Festival Política.',
			},
			gallery: [
				'/assets/images/constelacoes/4.jpg',
				'/assets/images/constelacoes/1.jpg',
				'/assets/images/constelacoes/2.jpg',
				'/assets/images/constelacoes/5.jpg',
				'/assets/images/constelacoes/3.jpg',
			],
		},

		{
			id: 'desalojamento',
			pile: true,
			flagship: true,
			shelf: 'projetos',
			year: 2025,
			title: 'DesALojamento',
			url: {
				pt: 'https://desalojamento.pt',
				en: 'https://desalojamento.pt/en',
				es: 'https://desalojamento.pt',
			},
			type: { pt: 'ensaio visual', en: 'visual essay', es: 'ensayo visual' },
			thumb: '/assets/images/thumbnails/desalojamento.webp',
			description: {
				pt: 'Ensaio visual sobre o impacto do Alojamento Local na crise da habitação em Lisboa e no Porto.',
				en: 'Visual essay on the impact of short-term rentals on the housing crisis in Lisbon and Porto.',
				es: 'Ensayo visual sobre el impacto del alquiler de corta duración en la crisis de la vivienda en Lisboa y Oporto.',
			},
		},

		{
			id: 'ruas-do-genero',
			pile: true,
			shelf: 'projetos',
			year: 2022,
			flagship: true,
			title: 'Ruas do Género',
			url: {
				pt: 'https://ruasdogenero.pt/pt',
				en: 'https://ruasdogenero.pt',
				es: 'https://ruasdogenero.pt',
			},
			type: { pt: 'ensaio visual', en: 'visual essay', es: 'ensayo visual' },
			thumb: '/assets/images/thumbnails/ruasdogenero.webp',
			description: {
				pt: 'Ensaio visual sobre a representação das mulheres na toponímia do Porto.',
				en: "Visual essay on the representation of women in Porto's street naming.",
				es: 'Ensayo visual sobre la representación de las mujeres en los nombres de las calles de Oporto.',
			},
			awards: [
				{
					url: 'https://pudding.cool/pudding-cup/',
					label: {
						pt: 'Selecionado como uma das melhores histórias visuais e de dados de 2022 pelo The Pudding',
						en: 'Selected as one of the Best Visual and Data-Driven Stories of 2022 by The Pudding',
						es: 'Seleccionado como una de las mejores historias visuales y de datos de 2022 por The Pudding',
					},
				},
				{
					url: 'https://www.escs.ipl.pt/editoriais/premiar-o-jornalismo-de-dados',
					label: {
						pt: 'Menção honrosa nos Prémios SPE de Jornalismo de Dados',
						en: 'Honorable Mention at the SPE Data Journalism Awards',
						es: 'Mención honorífica en los Premios SPE de Periodismo de Datos',
					},
				},
			],
		},

		{
			id: 'cosmos-explorer',
			pile: false,
			shelf: 'textos',
			year: 2026,
			title: 'Uncovering the Shape of Fraud with Cosmos Explorer',
			url: 'https://medium.com/feedzaitech/uncovering-the-shape-of-fraud-with-cosmos-explorer-visual-metaphors-behind-millions-of-transactions-b98e4cf56e56',
			type: { pt: 'artigo técnico', en: 'technical article', es: 'artículo técnico' },
			venue: 'Feedzai',
			thumb: '/assets/images/thumbnails/fraud.webp',
			description: {
				pt: 'Artigo técnico sobre o uso de metáforas visuais para revelar padrões em dados de transações financeiras.',
				en: 'Technical article on using visual metaphors to reveal patterns in financial transaction data.',
				es: 'Artículo técnico sobre el uso de metáforas visuales para revelar patrones en datos de transacciones financieras.',
			},
		},

		{
			id: 'far-right',
			pile: true,
			shelf: 'textos',
			year: 2026,
			title: "Media's role in normalizing the far right",
			url: 'https://www.taylorfrancis.com/chapters/edit/10.4324/9781032710167-3/role-media-normalising-far-right-luca-manucci-joão-bernardo-narciso',
			type: { pt: 'capítulo de livro', en: 'book chapter', es: 'capítulo de libro' },
			venue: 'Routledge',
			thumb: '/assets/images/thumbnails/farright.webp',
			description: {
				pt: 'Capítulo de livro sobre o papel dos meios de comunicação na normalização da extrema-direita em Portugal e Espanha.',
				en: 'Book chapter on the role of the media in normalizing the far right in Portugal and Spain.',
				es: 'Capítulo de libro sobre el papel de los medios en la normalización de la extrema derecha en Portugal y España.',
			},
		},

		{
			id: 'cultura-dos-jogos',
			pile: false,
			shelf: 'textos',
			year: 2025,
			title: 'A cultura dos jogos na construção da manosfera',
			url: 'https://redeanticapitalista.net/a-cultura-dos-jogos-na-construcao-da-manosfera/',
			type: { pt: 'artigo de opinião', en: 'opinion piece', es: 'artículo de opinión' },
			venue: 'RA Zine',
			thumb: '/assets/images/thumbnails/razine2.webp',
			description: {
				pt: 'Artigo de opinião sobre a cultura dos videojogos como espaço de socialização da manosfera.',
				en: 'Opinion piece on video game culture as a space for the socialization of the manosphere.',
				es: 'Artículo de opinión sobre la cultura de los videojuegos como espacio de socialización de la manosfera.',
			},
		},

		{
			id: 'pulsometro',
			pile: true,
			flagship: true,
			shelf: 'textos',
			year: 2024,
			title: 'Onde está a ética do Pulsómetro?',
			url: 'https://www.publico.pt/2024/02/17/opiniao/opiniao/onde-etica-pulsometro-2080435',
			type: { pt: 'artigo de opinião', en: 'opinion piece', es: 'artículo de opinión' },
			venue: 'Público',
			thumb: '/assets/images/thumbnails/publico2.webp',
			description: {
				pt: "Artigo de opinião sobre a ética do Pulsómetro eleitoral da CNN, um 'indicador de sentimento nas redes sociais' usado nas legislativas de 2024.",
				en: "Opinion piece on the ethics of CNN Portugal's Pulsómetro, an 'electoral sentiment indicator of social media' promoted during the 2024 general elections.",
				es: "Artículo de opinión sobre la ética del Pulsómetro electoral de CNN Portugal, un 'indicador de sentimiento en redes sociales' utilizado en las elecciones generales de 2024.",
			},
		},

		{
			id: 'abstencao',
			pile: true,
			shelf: 'textos',
			year: 2023,
			title: 'Afinal, quantas pessoas se abstêm em Portugal?',
			url: 'https://ffms.pt/pt-pt/estudos/policy-papers/afinal-quantas-pessoas-se-abstem-em-portugal',
			type: 'policy paper',
			venue: 'FFMS',
			thumb: '/assets/images/thumbnails/abstencao.webp',
			description: {
				pt: 'Policy paper sobre a abstenção eleitoral em Portugal, publicado pela Fundação Francisco Manuel dos Santos.',
				en: 'Policy paper on electoral abstention in Portugal, published by Fundação Francisco Manuel dos Santos.',
				es: 'Policy paper sobre la abstención electoral en Portugal, publicado por la Fundação Francisco Manuel dos Santos.',
			},
		},

		{
			id: 'digitaltraces',
			pile: false,
			shelf: 'textos',
			year: 2025,
			title: 'DigitalTraces',
			url: 'https://diglib.eg.org/items/fb9c677a-8d79-43c6-8754-9d08834771e2',
			type: { pt: 'artigo científico', en: 'scientific paper', es: 'artículo científico' },
			venue: 'EuroVis',
			thumb: '/assets/images/thumbnails/digitaltraces.webp',
			description: {
				pt: 'Artigo científico sobre uma ferramenta visual para detetar fraude na atividade digital dos utilizadores.',
				en: "Scientific paper on a visual analytics tool for spotting fraud in users' digital activity.",
				es: 'Artículo científico sobre una herramienta visual para detectar fraude en la actividad digital de los usuarios.',
			},
		},

		{
			id: 'bomba-relogio-abstencao',
			pile: false,
			shelf: 'textos',
			year: 2024,
			title: 'A Bomba-Relógio da Abstenção',
			url: 'https://www.culturgest.pt/pt/media/bomba-relogio-da-abstencao/',
			type: 'debate',
			venue: 'Culturgest',
			thumb: '/assets/images/thumbnails/bombarelogio.webp',
			description: {
				pt: 'Debate sobre as motivações da abstenção eleitoral.',
				en: 'A debate on why people abstain from voting.',
				es: 'Debate sobre las motivaciones de la abstención electoral.',
			},
		},

		/* ── MODELO — copia isto para acrescentar um projeto ───────────────────
		{
			id: 'nome-curto',
			pile: true,
			shelf: 'textos',
			year: 2025,
			title: 'Título',
			url: 'https://…',
			type: { pt: 'artigo de opinião', en: 'opinion piece', es: 'artículo de opinión' },
			venue: 'Onde saiu',
			thumb: '/assets/images/thumbnails/ficheiro.webp',
			description: {
				pt: 'Duas linhas, no máximo.',
				en: 'Two lines, maximum.',
				es: 'Dos líneas, como máximo.',
			},
		},
		─────────────────────────────────────────────────────────────────────── */

	],
};
