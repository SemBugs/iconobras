<template>
    <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
        <div class="shadow-sm">
            <div class="relative flex w-full items-center bg-white px-6 py-2.5 dark:bg-[#0e1726]">
                <div class="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
                    <NuxtLink to="/" class="main-logo flex shrink-0 items-center">
                        <img class="inline w-8 ltr:-ml-1 rtl:-mr-1" src="/assets/images/logo.svg" alt="" />
                        <span
                            class="hidden align-middle text-2xl font-semibold transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline"><img
                                class="inline w-12 ml-1 rtl:-mr-1" src="/assets/images/nomeicon.svg" alt="" /></span>
                    </NuxtLink>

                    <a href="javascript:;"
                        class="text-primary collapse-icon flex flex-none rounded-full bg-red-50 p-2 hover:bg-primary hover:text-white ltr:ml-2 rtl:mr-2 dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-white lg:hidden"
                        @click="store.toggleSidebar()">
                        <icon-menu class="h-5 w-5" />
                    </a>
                </div>
                <div class="hidden ltr:mr-2 rtl:ml-2 sm:block">
                    <ul class="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <li>
                            <NuxtLink to="/apps/calendar"
                                class="text-primary block rounded-full bg-red-50 p-2 hover:bg-primary hover:text-white dark:bg-dark/40 dark:hover:bg-dark/60">
                                <icon-calendar />
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/apps/todolist"
                                class="text-primary block rounded-full bg-red-50 p-2 hover:bg-primary hover:text-white dark:bg-dark/40 dark:hover:bg-dark/60">
                                <icon-edit />
                            </NuxtLink>
                        </li>
                        <!-- <li>
                            <NuxtLink to="/apps/chat"
                                class="text-primary block rounded-full bg-red-50 p-2 hover:bg-primary hover:text-white dark:bg-dark/40 dark:hover:bg-dark/60">
                                <icon-chat-notification />
                            </NuxtLink>
                        </li> -->
                    </ul>
                </div>
                <div
                    class="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                    <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
                        <form
                            class="absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0"
                            :class="{ '!block': search }" @submit.prevent="search = false">
                            <div class="relative">
                                <input type="text"
                                    class="peer form-input bg-gray-100 placeholder:tracking-widest ltr:pl-9 ltr:pr-9 rtl:pl-9 rtl:pr-9 sm:bg-transparent ltr:sm:pr-4 rtl:sm:pl-4"
                                    placeholder="Procurar..." />
                                <button type="button"
                                    class="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-white ltr:right-auto rtl:left-auto">
                                    <icon-search class="mx-auto" />
                                </button>
                                <button type="button"
                                    class="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 ltr:right-2 rtl:left-2 sm:hidden"
                                    @click="search = false">
                                    <icon-x-circle />
                                </button>
                            </div>
                        </form>

                        <button type="button"
                            class="text-primary search_btn rounded-full bg-red-50 p-2 hover:bg-primary dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden"
                            @click="search = !search">
                            <icon-search class="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]" />
                        </button>
                    </div>
                    <div>
                        <a href="javascript:;" v-show="store.theme === 'light'"
                            class="text-primary flex items-center rounded-full bg-red-50 p-2 hover:bg-primary hover:text-white dark:bg-dark/40 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('dark')">
                            <icon-sun />
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'dark'"
                            class="text-primary flex items-center rounded-full bg-red-50 p-2 hover:bg-primary hover:text-white dark:bg-dark/40 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('system')">
                            <icon-moon />
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'system'"
                            class="text-primary flex items-center rounded-full bg-red-50 p-2 hover:bg-primary hover:text-white dark:bg-dark/40 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('light')">
                            <icon-laptop />
                        </a>
                    </div>

                    <div class="dropdown shrink-0">
                        <client-only>
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'"
                                offsetDistance="8">
                                <button type="button"
                                    class="text-primary block rounded-full bg-red-50 p-2 hover:bg-primary hover:text-white dark:bg-dark/40 dark:hover:bg-dark/60">
                                    <img :src="currentFlag" alt="flag" class="h-5 w-5 rounded-full object-cover" />
                                </button>
                                <template #content="{ close }">
                                    <ul class="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90"
                                        @click="close()">
                                        <template v-for="item in store.languageList" :key="item.code">
                                            <li>
                                                <button type="button" class="w-full hover:text-white"
                                                    :class="{ 'bg-primary/10 text-white': store.locale === item?.code }"
                                                    @click="changeLanguage(item)">
                                                    <img class="h-5 w-5 rounded-full object-cover"
                                                        :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`"
                                                        alt="" />
                                                    <span class="ltr:ml-3 rtl:mr-3">{{ item.name }}</span>
                                                </button>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                            </Popper>
                        </client-only>
                    </div>

                    <div class="dropdown shrink-0">
                        <client-only>
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'"
                                offsetDistance="8">
                                <button type="button"
                                    class="text-primary relative block rounded-full bg-red-50 p-2 hover:bg-primary hover:text-white dark:bg-dark/40 dark:hover:bg-dark/60">
                                    <icon-bell-bing />

                                    <span v-if="notifications.length > 0"
                                        class="absolute top-0 flex h-3 w-3 ltr:right-0 rtl:left-0">
                                        <span
                                            class="absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 ltr:-left-[3px] rtl:-right-[3px]"></span>
                                        <span
                                            class="relative inline-flex h-[6px] w-[6px] rounded-full bg-success"></span>
                                    </span>
                                </button>
                                <template #content="{ close }">
                                    <ul
                                        class="w-[300px] divide-y !py-0 text-dark dark:divide-white/10 dark:text-white-dark sm:w-[350px]">
                                        <li>
                                            <div class="flex items-center justify-between px-4 py-2 font-semibold">
                                                <h4 class="text-lg">Notificações</h4>
                                                <template v-if="notifications.length">
                                                    <span class="badge bg-[#f2b717]">
                                                        {{ notifications.length }}
                                                        {{ notifications.length == 1 ? 'nova' : 'novas' }}
                                                    </span>
                                                </template>
                                            </div>
                                        </li>
                                        <template v-for="notification in notifications" :key="notification.id">
                                            <li class="dark:text-white-light/90 cursor-pointer"
                                                @click="deleteNotifi(notification)">
                                                <div class="group flex items-center px-4 py-2">
                                                    <div class="flex flex-auto ltr:pl-3 rtl:pr-3">
                                                        <div class="ltr:pr-3 rtl:pl-3">
                                                            <h6 v-html="notification.message"></h6>
                                                            <span class="block text-xs font-normal dark:text-gray-500">
                                                                {{ $filters.formatDateHora(notification.timestamp) }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </template>
                                        <!-- <template v-if="notifications.length">
                                                <li>
                                                    <div class="p-4">
                                                        <button class="btn btn-primary btn-small block w-full"
                                                            @click="close()">Ler todas as notificações</button>
                                                    </div>
                                                </li>
                                            </template> -->
                                        <template v-if="!notifications.length">
                                            <li>
                                                <div
                                                    class="!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent">
                                                    <div
                                                        class="mx-auto mb-4 rounded-full text-[#f2b717] ring-4 ring-[#f2b717]/30">
                                                        <svg width="40" height="40" viewBox="0 0 20 20" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.5"
                                                                d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z"
                                                                fill="currentColor" />
                                                            <path
                                                                d="M10 4.25C10.4142 4.25 10.75 4.58579 10.75 5V11C10.75 11.4142 10.4142 11.75 10 11.75C9.58579 11.75 9.25 11.4142 9.25 11V5C9.25 4.58579 9.58579 4.25 10 4.25Z"
                                                                fill="currentColor" />
                                                            <path
                                                                d="M10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                    Não há dados disponíveis.
                                                </div>
                                            </li>
                                        </template>
                                    </ul>
                                </template>
                            </Popper>
                        </client-only>
                    </div>

                    <div class="dropdown shrink-0">
                        <client-only>
                            <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'"
                                offsetDistance="8" class="!block">
                                <button type="button" class="group relative block">
                                    <div class="flex items-center text-left md:px-4">
                                        <img v-show="store.empresa?.logo"
                                            class="h-9 w-9 rounded-full object- p-1 border saturate-50 group-hover:saturate-100"
                                            :src="img(store.empresa?.logo, { width: 150, height: 150, format: 'webp' })"
                                            alt="" />

                                        <div v-show="!store.empresa?.logo"
                                            class="grid h-10 w-10 place-content-center rounded-full bg-primary text-sm font-semibold text-white ltr:mr-2 rtl:ml-2">
                                            <icon-empresa />
                                        </div>

                                        <div class="ltr:pl-1 rtl:pr-4 mt-1 max-w-[150px] md:max-w-[500px]"
                                            style="line-height: 10px">
                                            <a class="text-black/60 hover:text-primary text-ellipsis dark:text-dark-light/60 dark:hover:text-white"
                                                href="javascript:;"> {{ user?.first_name }}</a>
                                            <div class="text-ellipsis">
                                                <h4 class="text-base text-sm">{{ store.empresa?.nome }}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                                <template #content="{ close }">
                                    <ul
                                        class="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                        <li>
                                            <NuxtLink to="/company-selector" class="dark:hover:text-white">
                                                <icon-user class="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                                Acessar outra empresa
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink href="/users/user-account-settings" class="dark:hover:text-white">
                                                <svg width="18" height="18" class="h-4.5 w-4.5 ltr:mr-2 rtl:ml-2"
                                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M2 8V6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6V18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18V12"
                                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                                    </path>
                                                    <path
                                                        d="M10 8.24268L13.3137 4.92902C14.8758 3.36692 17.4084 3.36692 18.9705 4.92902C20.5326 6.49112 20.5326 9.02378 18.9705 10.5859L9.3064 20.25"
                                                        stroke="currentColor" stroke-width="1.5"></path>
                                                    <path
                                                        d="M18 22V21.25V22ZM18 14V14.75V14ZM22 18H21.25H22ZM13 22.75C13.4142 22.75 13.75 22.4142 13.75 22C13.75 21.5858 13.4142 21.25 13 21.25V22.75ZM17 21.25C16.5858 21.25 16.25 21.5858 16.25 22C16.25 22.4142 16.5858 22.75 17 22.75V21.25ZM15.5 14.75L18 14.75V13.25L15.5 13.25V14.75ZM21.25 18C21.25 19.7949 19.7949 21.25 18 21.25V22.75C20.6234 22.75 22.75 20.6234 22.75 18H21.25ZM22.75 18C22.75 15.3766 20.6234 13.25 18 13.25V14.75C19.7949 14.75 21.25 16.2051 21.25 18H22.75ZM13 21.25L6 21.25L6 22.75L13 22.75V21.25ZM18 21.25H17V22.75H18V21.25Z"
                                                        fill="currentColor"></path>
                                                    <path
                                                        d="M7 18C7 18.5523 6.55228 19 6 19C5.44772 19 5 18.5523 5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18Z"
                                                        stroke="currentColor" stroke-width="1.5"></path>
                                                </svg>

                                                Configurações Gerais
                                            </NuxtLink>
                                        </li>
                                        <li @click="sair"
                                            class="cursor-pointer border-t border-white-light dark:border-white-light/10">
                                            <NuxtLink class="!py-3 text-danger">
                                                <icon-logout class="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                                                Sair
                                            </NuxtLink>
                                        </li>

                                    </ul>
                                </template>
                            </Popper>
                        </client-only>
                    </div>
                </div>
            </div>

            <!-- horizontal menu -->
            <ul
                class="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black rtl:space-x-reverse dark:border-[#191e3a] dark:bg-[#0e1726] dark:text-white-dark lg:space-x-1.5 xl:space-x-8">
                <li class="menu nav-item relative">
                    <NuxtLink to="/" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-dashboard class="shrink-0" />

                            <span class="px-2">{{ $t('dashboard') }}</span>
                        </div>
                    </NuxtLink>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-apps class="shrink-0" />

                            <span class="px-2">{{ $t('apps') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <NuxtLink to="/apps/chat">{{ $t('chat') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/apps/mailbox">{{ $t('mailbox') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/apps/todolist">{{ $t('todo_list') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/apps/notes">{{ $t('notes') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/apps/scrumboard">{{ $t('scrumboard') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/apps/contacts">{{ $t('contacts') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/apps/calendar">{{ $t('calendar') }}</NuxtLink>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-components class="shrink-0" />
                            <span class="px-2">{{ $t('components') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <NuxtLink to="/components/tabs">{{ $t('tabs') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/accordions">{{ $t('accordions') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/modals">{{ $t('modals') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/cards">{{ $t('cards') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/carousel">{{ $t('carousel') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/countdown">{{ $t('countdown') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/counter">{{ $t('counter') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/sweetalert">{{ $t('sweet_alerts') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/timeline">{{ $t('timeline') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/notifications">{{ $t('notifications') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/media-object">{{ $t('media_object') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/list-group">{{ $t('list_group') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/pricing-table">{{ $t('pricing_tables') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/components/lightbox">{{ $t('lightbox') }}</NuxtLink>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-elements class="shrink-0" />
                            <span class="px-2">{{ $t('elements') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <NuxtLink to="/elements/alerts">{{ $t('alerts') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/avatar">{{ $t('avatar') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/badges">{{ $t('badges') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/breadcrumbs">{{ $t('breadcrumbs') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/buttons">{{ $t('buttons') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/buttons-group">{{ $t('button_groups') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/color-library">{{ $t('color_library') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/dropdown">{{ $t('dropdown') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/infobox">{{ $t('infobox') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/jumbotron">{{ $t('jumbotron') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/loader">{{ $t('loader') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/pagination">{{ $t('pagination') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/popovers">{{ $t('popovers') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/progress-bar">{{ $t('progress_bar') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/search">{{ $t('search') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/tooltips">{{ $t('tooltips') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/treeview">{{ $t('treeview') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/elements/typography">{{ $t('typography') }}</NuxtLink>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-datatables class="shrink-0" />
                            <span class="px-2">{{ $t('tables') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <NuxtLink to="/tables">{{ $t('tables') }}</NuxtLink>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('datatables') }}
                                <div class="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                <li>
                                    <NuxtLink to="/datatables/basic">{{ $t('basic') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/advanced">{{ $t('advanced') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/skin">{{ $t('skin') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/order-sorting">{{ $t('order_sorting') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/columns-filter">{{ $t('columns_filter') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/multi-column">{{ $t('multi_column') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/multiple-tables">{{ $t('multiple_tables') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/alt-pagination">{{ $t('alt_pagination') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/checkbox">{{ $t('checkbox') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/range-search">{{ $t('range_search') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/export">{{ $t('export') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/sticky-header">{{ $t('sticky_header') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/clone-header">{{ $t('clone_header') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/datatables/column-chooser">{{ $t('column_chooser') }}</NuxtLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-forms class="shrink-0" />
                            <span class="px-2">{{ $t('forms') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <NuxtLink to="/forms/basic">{{ $t('basic') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/input-group">{{ $t('input_group') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/layouts">{{ $t('layouts') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/validation">{{ $t('validation') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/input-mask">{{ $t('input_mask') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/select2">{{ $t('select2') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/touchspin">{{ $t('touchspin') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/checkbox-radio">{{ $t('checkbox_and_radio') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/switches">{{ $t('switches') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/wizards">{{ $t('wizards') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/file-upload">{{ $t('file_upload') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/quill-editor">{{ $t('quill_editor') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/markdown-editor">{{ $t('markdown_editor') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/date-picker">{{ $t('date_and_range_picker') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/forms/clipboard">{{ $t('clipboard') }}</NuxtLink>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-pages class="shrink-0" />
                            <span class="px-2">{{ $t('pages') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li class="relative">
                            <a href="javascript:;">{{ $t('users') }}
                                <div class="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                <li>
                                    <NuxtLink to="/users/profile">{{ $t('profile') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/users/user-account-settings">{{ $t('account_settings') }}</NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <NuxtLink to="/pages/knowledge-base">{{ $t('knowledge_base') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/pages/contact-us-boxed" target="_blank">{{ $t('contact_us_boxed') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/pages/contact-us-cover" target="_blank">{{ $t('contact_us_cover') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/pages/faq">FAQ</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/pages/coming-soon-boxed" target="_blank">{{ $t('coming_soon_boxed') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/pages/coming-soon-cover" target="_blank">{{ $t('coming_soon_cover') }}
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/pages/maintenence" target="_blank">{{ $t('maintenence') }}</NuxtLink>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('error') }}
                                <div class="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                <li>
                                    <NuxtLink to="/pages/error404" target="_blank">{{ $t('404') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/pages/error500" target="_blank">{{ $t('500') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/pages/error503" target="_blank">{{ $t('503') }}</NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('login') }}
                                <div class="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                <li>
                                    <NuxtLink to="/auth/cover-login" target="_blank">{{ $t('login_cover') }}</NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/auth/boxed-signin" target="_blank">{{ $t('login_boxed') }}</NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('register') }}
                                <div class="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                <li>
                                    <NuxtLink to="/auth/cover-register" target="_blank">{{ $t('register_cover') }}
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/auth/boxed-signup" target="_blank">{{ $t('register_boxed') }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('password_recovery') }}
                                <div class="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                <li>
                                    <NuxtLink to="/auth/cover-password-reset" target="_blank">{{ $t('recover_id_cover')
                                        }}
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/auth/boxed-password-reset" target="_blank">{{ $t('recover_id_boxed')
                                        }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li class="relative">
                            <a href="javascript:;">{{ $t('lockscreen') }}
                                <div class="-rotate-90 ltr:ml-auto rtl:mr-auto rtl:rotate-90">
                                    <icon-caret-down />
                                </div>
                            </a>
                            <ul
                                class="absolute top-0 z-[10] hidden min-w-[180px] rounded bg-white p-0 py-2 text-dark shadow ltr:left-[95%] rtl:right-[95%] dark:bg-[#1b2e4b] dark:text-white-dark">
                                <li>
                                    <NuxtLink to="/auth/cover-lockscreen" target="_blank">{{ $t('unlock_cover') }}
                                    </NuxtLink>
                                </li>
                                <li>
                                    <NuxtLink to="/auth/boxed-lockscreen" target="_blank">{{ $t('unlock_boxed') }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="menu nav-item relative">
                    <a href="javascript:;" class="nav-link">
                        <div class="flex items-center">
                            <icon-menu-more class="shrink-0" />

                            <span class="px-2">{{ $t('more') }}</span>
                        </div>
                        <div class="right_arrow">
                            <icon-caret-down />
                        </div>
                    </a>
                    <ul class="sub-menu">
                        <li>
                            <NuxtLink to="/dragndrop">{{ $t('drag_and_drop') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/charts">{{ $t('charts') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/font-icons">{{ $t('font_icons') }}</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/widgets">{{ $t('widgets') }}</NuxtLink>
                        </li>
                        <li>
                            <a href="https://red7.com.br" target="_blank">{{ $t('documentation') }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </header>

    <!-- standard  -->
    <!--    <div>-->
    <!-- Modal Change Company-->
    <!--        <TransitionRoot appear :show="changeCompany" as="template">-->
    <!--            <Dialog as="div" @close="changeCompany = false" class="relative z-50">-->
    <!--                <TransitionChild-->
    <!--                    as="template"-->
    <!--                    enter="duration-300 ease-out"-->
    <!--                    enter-from="opacity-0"-->
    <!--                    enter-to="opacity-100"-->
    <!--                    leave="duration-200 ease-in"-->
    <!--                    leave-from="opacity-100"-->
    <!--                    leave-to="opacity-0"-->
    <!--                >-->
    <!--                    <DialogOverlay class="fixed inset-0 bg-[black]/60" />-->
    <!--                </TransitionChild>-->
    <!---->
    <!--                <div class="fixed inset-0 overflow-y-auto">-->
    <!--                    <div class="flex min-h-full items-start justify-center px-4 py-8">-->
    <!--                        <TransitionChild-->
    <!--                            as="template"-->
    <!--                            enter="duration-300 ease-out"-->
    <!--                            enter-from="opacity-0 scale-95"-->
    <!--                            enter-to="opacity-100 scale-100"-->
    <!--                            leave="duration-200 ease-in"-->
    <!--                            leave-from="opacity-100 scale-100"-->
    <!--                            leave-to="opacity-0 scale-95"-->
    <!--                        >-->
    <!--                            <DialogPanel class="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">-->
    <!--                                <div class="flex items-center justify-center dark:text-white-dark/70 text-base font-medium text-[#1f2937] p-5">-->
    <!--                                    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-[#f1f2f3] dark:bg-white/10">-->
    <!--                                        <svg> ... </svg>-->
    <!--                                    </div>-->
    <!--                                </div>-->
    <!--                                <div class="p-5">-->
    <!--                                    <div class="text-white-dark text-center text-sm">-->
    <!--                                        <p>-->
    <!--                                            Vivamus vitae hendrerit neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi consequat auctor turpis, vitae dictum-->
    <!--                                            augue efficitur vitae. Vestibulum a risus ipsum. Quisque nec lacus dolor. Quisque ornare tempor orci id rutrum.-->
    <!--                                        </p>-->
    <!--                                    </div>-->
    <!--                                    <div class="flex justify-end items-center mt-8">-->
    <!--                                        <button type="button" class="btn btn-outline-danger" @click="changeCompany = false">Discard</button>-->
    <!--                                        <button type="button" class="btn btn-primary ltr:ml-4 rtl:mr-4" @click="changeCompany = false">Save</button>-->
    <!--                                    </div>-->
    <!--                                </div>-->
    <!--                            </DialogPanel>-->
    <!--                        </TransitionChild>-->
    <!--                    </div>-->
    <!--                </div>-->
    <!--            </Dialog>-->
    <!--        </TransitionRoot>-->
    <!--    </div>-->
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue';

import appSetting from '@/app-setting';

import { useRoute } from 'vue-router';
import { useAppStore } from '~/stores';

import * as sweetalert2 from 'sweetalert2';
const store = useAppStore();
const route = useRoute();
const search = ref(false);
const { setLocale } = useI18n();
const { getNotifications, deleteNotification } = useDirectusNotifications();
const { logout } = useDirectusAuth()

const user = useDirectusUser();
const { getThumbnail: img } = useDirectusFiles();

const changeCompany = ref(true)

// multi language
const changeLanguage = (item: any) => {
    appSetting.toggleLanguage(item, setLocale);
};
const currentFlag = computed(() => {
    return `/assets/images/flags/${store.locale?.toUpperCase()}.svg`;
});

const getNotification = async () => {
    notifications.value = await getNotifications({
        params: {
            filter: { recipient: user.value.id },
        },
    });
};

const deleteNotifi = async (item: any) => {
    await deleteNotification({ notifications: [item.id] });
    getNotification();

    if (item.url) {
        window.location.href = item.url;
    }
};

const notifications = ref([]);

const messages = ref([]);

onMounted(() => {
    getNotification();
    setActiveDropdown();
});

watch(route, (to, from) => {
    setActiveDropdown();
});

const setActiveDropdown = () => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
        selector.classList.add('active');
        const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
        for (let i = 0; i < all.length; i++) {
            all[0]?.classList.remove('active');
        }
        const ul: any = selector.closest('ul.sub-menu');
        if (ul) {
            let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
            if (ele) {
                ele = ele[0];
                setTimeout(() => {
                    ele?.classList.add('active');
                });
            }
        }
    }
};

const sair = async () => {

    await logout()

    // clear cookies
    document.cookie = 'directus_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'directus_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'directus_token_expires=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'directus_token_expired_at=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    await sweetalert2.default.fire({
        title: 'Saindo...',
        text: 'Você será redirecionado para a página de login.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
    });

    window.location.href = '/auth/signup';

};

const removeMessage = (value: number) => {
    messages.value = messages.value.filter((d) => d.id !== value);
};
</script>
