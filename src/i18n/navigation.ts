import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Wrappers de navegação cientes de locale (o switch de idioma preserva a página — F08).
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
