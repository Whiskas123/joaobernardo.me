/* ============================================================================
   joaobernardo.me — FICHEIRO ÚNICO
   ----------------------------------------------------------------------------
   Tudo o que aparece nas três páginas (pt / en / es) vem daqui.
   As páginas index.html, en/index.html e es/index.html não têm texto nenhum
   da lista — só o esqueleto. Para mudar seja o que for, muda-se este ficheiro.

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
   description   o texto curto do hover. MÁXIMO DUAS LINHAS — mais do que isso
                 passa por cima das bolhas. { pt, en, es }
   modal         opcional. Texto mais longo, só aparece no popup. { pt, en, es }
   popup         true abre o popup em vez de ir direto ao site (no telemóvel
                 é sempre popup, isto é só para o computador)
   gallery       opcional. Lista de fotografias para o popup.
   galleryAlt    descrição de cada fotografia, pela mesma ordem. { pt, en, es }
   awards        opcional. Prémios, aparecem por baixo da descrição.
   ============================================================================ */

window.SITE = {

	/* ── Opções ───────────────────────────────────────────────────────────── */
	config: {
		// true = os projetos com ★ sobem todos para o topo da sua secção.
		// false = a lista é puramente por ano (mais recente primeiro).
		flagshipsFirst: false,
	},

	/* ── Secções ──────────────────────────────────────────────────────────────
	   Para criar uma secção nova (ex.: "Conversas"), acrescenta um bloco aqui
	   e usa o `id` no campo `shelf` dos projetos. O minidisco 3 está livre.   */
	shelves: [
		{
			id: 'projetos',
			disc: '/assets/images/minidisc1.png',
			tilt: '9.4deg',
			tiltHover: '-6.6deg',
			name: { pt: 'Projetos', en: 'Projects', es: 'Proyectos' },
		},
		{
			id: 'textos',
			disc: '/assets/images/minidisc2.png',
			tilt: '-13.3deg',
			tiltHover: '6.7deg',
			name: { pt: 'Textos', en: 'Writing', es: 'Textos' },
		},
	],

	/* ── Texto da página ──────────────────────────────────────────────────── */
	ui: {
		pt: {
			hello: 'Olá',
			blurb: 'Chamo-me <b>João Bernardo Narciso</b> e faço coisas.',
			linksLabel: 'Links',
			listLabel: 'Projetos e textos',
			flagshipLabel: 'Projeto principal',
			open: 'Abrir',
			close: 'Fechar',
			gallery: 'Fotografias do projeto',
		},
		en: {
			hello: 'Hi',
			blurb: 'My name is <b>João Bernardo Narciso</b> and I make things.',
			linksLabel: 'Links',
			listLabel: 'Projects and writing',
			flagshipLabel: 'Main project',
			open: 'Open',
			close: 'Close',
			gallery: 'Project photographs',
		},
		es: {
			hello: 'Hola',
			blurb: 'Me llamo <b>João Bernardo Narciso</b> y hago cosas.',
			linksLabel: 'Enlaces',
			listLabel: 'Proyectos y textos',
			flagshipLabel: 'Proyecto principal',
			open: 'Abrir',
			close: 'Cerrar',
			gallery: 'Fotografías del proyecto',
		},
	},

	/* ── Projetos ─────────────────────────────────────────────────────────── */
	projects: [

		{
			id: 'tele-textual',
			shelf: 'projetos',
			year: 2026,
			flagship: true,
			popup: true,
			title: 'Tele-textual',
			url: {
				pt: 'https://teletext.joaobernardo.me',
				en: 'https://teletext.joaobernardo.me/en',
				es: 'https://teletext.joaobernardo.me/en',
			},
			type: { pt: 'instalação', en: 'installation', es: 'instalación' },
			// FALTA A MINIATURA. Mete um screenshot da página 100 em
			// /assets/images/thumbnails/teletextual.png e descomenta a linha:
			// thumb: '/assets/images/thumbnails/teletextual.png',
			description: {
				pt: 'Uma instalação participativa construída sobre o arquivo do teletexto português.',
				en: 'A participatory installation built on the Portuguese teletext archive.',
				es: 'Una instalación participativa construida sobre el archivo del teletexto portugués.',
			},
			modal: {
				pt: 'Páginas de teletexto recuperadas do Arquivo.pt — notícias, meteorologia, lotaria, horóscopos — devolvidas a um ecrã. Podes ver sozinho ou abrir uma sala: todos veem a mesma página ao mesmo tempo, e mudar de página é uma votação. E há um editor, para fazer páginas novas dentro das mesmas restrições: 40×24, oito cores, gráficos em mosaico.',
				en: 'Teletext pages recovered from Arquivo.pt — news, weather, the lottery, horoscopes — put back on a screen. Watch alone, or open a room: everyone sees the same page at the same moment, and changing it is a vote. There is an editor too, for making new pages under the same constraints: 40×24, eight colours, mosaic graphics.',
				es: 'Páginas de teletexto recuperadas de Arquivo.pt — noticias, meteorología, lotería, horóscopos — devueltas a una pantalla. Puedes verlas solo o abrir una sala: todos ven la misma página al mismo tiempo y cambiarla es una votación. También hay un editor, para crear páginas nuevas con las mismas restricciones: 40×24, ocho colores, gráficos en mosaico.',
			},
		},

		{
			id: 'constelacoes',
			shelf: 'projetos',
			year: 2025,
			flagship: true,
			popup: true,
			title: 'Constelações Parlamentares',
			url: 'https://parliament.joaobernardo.me',
			type: {
				pt: 'ensaio + exposição',
				en: 'essay + exhibition',
				es: 'ensayo + exposición',
			},
			thumb: '/assets/images/thumbnails/europeanparliament2.png',
			description: {
				pt: 'As votações do Parlamento Europeu desde 2004, redesenhadas como uma rede.',
				en: 'Every European Parliament roll-call vote since 2004, redrawn as a network.',
				es: 'Las votaciones del Parlamento Europeo desde 2004, redibujadas como una red.',
			},
			modal: {
				pt: 'Todas as votações nominais do Parlamento Europeu desde 2004, redesenhadas como uma rede: dois eurodeputados ficam lado a lado quando votam da mesma maneira. Do site interativo nasceu uma exposição — três paredes impressas e anotadas que explicam como se constrói a rede, o que as constelações dizem sobre os grupos políticos e como o Parlamento mudou em vinte anos.',
				en: 'Every roll-call vote of the European Parliament since 2004, redrawn as a network: two MEPs sit close together when they vote the same way. The interactive site grew into an exhibition — three printed, annotated walls on how the network is built, what the constellations say about the political groups, and how the Parliament changed over twenty years.',
				es: 'Todas las votaciones nominales del Parlamento Europeo desde 2004, redibujadas como una red: dos eurodiputados se sitúan juntos cuando votan de la misma manera. Del sitio interactivo nació una exposición: tres paredes impresas y anotadas sobre cómo se construye la red, qué dicen las constelaciones de los grupos políticos y cómo cambió el Parlamento en veinte años.',
			},
			gallery: [
				'/assets/images/constelacoes/4.jpg',
				'/assets/images/constelacoes/1.jpg',
				'/assets/images/constelacoes/2.jpg',
				'/assets/images/constelacoes/5.jpg',
				'/assets/images/constelacoes/3.jpg',
			],
			galleryAlt: {
				pt: [
					'Visita guiada à exposição, em frente aos painéis das redes por área política.',
					'Visitante a apontar para a rede impressa, com fios a ligar os eurodeputados.',
					'Pormenor do painel «Agricultura e desenvolvimento rural», com a rede e o texto explicativo.',
					'Grupo de visitantes em frente à parede central da exposição.',
					'Vista da sala da exposição, com os painéis das redes no piso superior.',
				],
				en: [
					'Guided tour of the exhibition, in front of the policy-area network panels.',
					'A visitor pointing at the printed network, threads linking the MEPs.',
					'Detail of the Agriculture and rural development panel, network and explanatory text.',
					"Visitors in front of the exhibition's centre wall.",
					'View of the exhibition room, with the network panels on the upper floor.',
				],
				es: [
					'Visita guiada a la exposición, frente a los paneles de redes por área política.',
					'Una visitante señalando la red impresa, con hilos que unen a los eurodiputados.',
					'Detalle del panel Agricultura y desarrollo rural, con la red y el texto explicativo.',
					'Grupo de visitantes frente a la pared central de la exposición.',
					'Vista de la sala de la exposición, con los paneles de redes en el piso superior.',
				],
			},
		},

		{
			id: 'desalojamento',
			shelf: 'projetos',
			year: 2025,
			title: 'DesALojamento',
			url: {
				pt: 'https://desalojamento.pt',
				en: 'https://desalojamento.pt/en',
				es: 'https://desalojamento.pt',
			},
			type: { pt: 'ensaio visual', en: 'visual essay', es: 'ensayo visual' },
			thumb: '/assets/images/thumbnails/desalojamento.png',
			description: {
				pt: 'Ensaio visual sobre o impacto do Alojamento Local na crise da habitação em Lisboa e no Porto.',
				en: 'Visual essay on the impact of short-term rentals on the housing crisis in Lisbon and Porto.',
				es: 'Ensayo visual sobre el impacto del alquiler de corta duración en la crisis de la vivienda en Lisboa y Oporto.',
			},
		},

		{
			id: 'ruas-do-genero',
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
			thumb: '/assets/images/thumbnails/ruasdogenero.png',
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
			shelf: 'textos',
			year: 2026,
			title: 'Uncovering the Shape of Fraud with Cosmos Explorer',
			url: 'https://medium.com/feedzaitech/uncovering-the-shape-of-fraud-with-cosmos-explorer-visual-metaphors-behind-millions-of-transactions-b98e4cf56e56',
			type: { pt: 'artigo técnico', en: 'technical article', es: 'artículo técnico' },
			venue: 'Feedzai',
			thumb: '/assets/images/thumbnails/fraud.png',
			description: {
				pt: 'Sobre o uso de metáforas visuais para revelar padrões em dados de transações financeiras.',
				en: 'On using visual metaphors to reveal patterns in financial transaction data.',
				es: 'Sobre el uso de metáforas visuales para revelar patrones en datos de transacciones financieras.',
			},
		},

		{
			id: 'far-right',
			shelf: 'textos',
			year: 2026,
			title: "Media's role in normalizing the far right",
			url: 'https://www.taylorfrancis.com/chapters/edit/10.4324/9781032710167-3/role-media-normalising-far-right-luca-manucci-joão-bernardo-narciso',
			type: { pt: 'capítulo de livro', en: 'book chapter', es: 'capítulo de libro' },
			venue: 'Routledge',
			thumb: '/assets/images/thumbnails/farright.png',
			description: {
				pt: 'Sobre o papel dos meios de comunicação na normalização da extrema-direita em Portugal e Espanha.',
				en: 'On the role of the media in normalizing the far right in Portugal and Spain.',
				es: 'Sobre el papel de los medios en la normalización de la extrema derecha en Portugal y España.',
			},
		},

		{
			id: 'cultura-dos-jogos',
			shelf: 'textos',
			year: 2025,
			title: 'A cultura dos jogos na construção da manosfera',
			url: 'https://redeanticapitalista.net/a-cultura-dos-jogos-na-construcao-da-manosfera/',
			type: { pt: 'opinião', en: 'opinion', es: 'opinión' },
			venue: 'RA Zine',
			thumb: '/assets/images/thumbnails/razine2.png',
			description: {
				pt: 'Sobre a cultura dos videojogos como espaço de socialização da manosfera.',
				en: 'On video game culture as a space for the socialization of the manosphere.',
				es: 'Sobre la cultura de los videojuegos como espacio de socialización de la manosfera.',
			},
		},

		{
			id: 'pulsometro',
			shelf: 'textos',
			year: 2024,
			title: 'Onde está a ética do Pulsómetro?',
			url: 'https://www.publico.pt/2024/02/17/opiniao/opiniao/onde-etica-pulsometro-2080435',
			type: { pt: 'opinião', en: 'opinion', es: 'opinión' },
			venue: 'Público',
			thumb: '/assets/images/thumbnails/publico2.png',
			description: {
				pt: "Sobre a ética do Pulsómetro eleitoral da CNN, um 'indicador de sentimento nas redes sociais' usado nas legislativas de 2024.",
				en: "On the ethics of CNN Portugal's Pulsómetro, an 'electoral sentiment indicator of social media' promoted during the 2024 general elections.",
				es: "Sobre la ética del Pulsómetro electoral de CNN Portugal, un 'indicador de sentimiento en redes sociales' utilizado en las elecciones generales de 2024.",
			},
		},

		{
			id: 'abstencao',
			shelf: 'textos',
			year: 2023,
			title: 'Afinal, quantas pessoas se abstêm em Portugal?',
			url: 'https://ffms.pt/pt-pt/estudos/policy-papers/afinal-quantas-pessoas-se-abstem-em-portugal',
			type: 'policy paper',
			venue: 'FFMS',
			thumb: '/assets/images/thumbnails/abstencao.png',
			description: {
				pt: 'Sobre a abstenção eleitoral em Portugal, publicado pela Fundação Francisco Manuel dos Santos.',
				en: 'On electoral abstention in Portugal, published by Fundação Francisco Manuel dos Santos.',
				es: 'Sobre la abstención electoral en Portugal, publicado por la Fundação Francisco Manuel dos Santos.',
			},
		},

		/* ── MODELO — copia isto para acrescentar um projeto ───────────────────
		{
			id: 'nome-curto',
			shelf: 'textos',
			year: 2025,
			title: 'Título',
			url: 'https://…',
			type: { pt: 'opinião', en: 'opinion', es: 'opinión' },
			venue: 'Onde saiu',
			thumb: '/assets/images/thumbnails/ficheiro.png',
			description: {
				pt: 'Duas linhas, no máximo.',
				en: 'Two lines, maximum.',
				es: 'Dos líneas, como máximo.',
			},
		},
		─────────────────────────────────────────────────────────────────────── */

	],
};
