import React from 'react';
import {
  FaBullhorn,
  FaComments,
  FaFirstOrderAlt,
  FaHome,
  FaTasks,
  FaThLarge,
  FaUsers,
  FaUsersCog,
  FaUserTie,
  FaImages,
  FaFileExport,
  FaFileImport,
} from 'react-icons/fa';

export const menu_admin_item_storage = [
  {
    id: 1,
    name: 'DashBoard',
    active: true,
    link: '/admin/warehouse/',
    icon: <FaHome />,
  },
  {
    id: 2,
    name: 'Storage',
    active: false,
    link: '/admin/warehouse/storage',
    icon: <FaThLarge />,
  },
  {
    id: 3,
    name: 'Export Storage',
    active: false,
    link: '/admin/warehouse/exportstorage',
    icon: <FaFileExport />,
  },
  {
    id: 4,
    name: 'Import Storage',
    active: false,
    link: '/admin/warehouse/importstorage',
    icon: <FaFileImport />,
  },
  {
    id: 5,
    name: 'Provider',
    active: false,
    link: '/admin/warehouse/provider',
    icon: <FaBullhorn />,
  },
];
