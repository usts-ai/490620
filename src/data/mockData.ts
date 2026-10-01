export type FileStatus = 'converti' | 'en_cours' | 'reconstruction' | 'erreur' | 'en_attente';

export interface DwgFile {
  id: string;
  name: string;
  size: string;
  version: string;
  status: FileStatus;
  progress: number;
  updatedAt: string;
  preview: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  delta: string;
  color: string;
}

export const stats: StatItem[] = [
  { id: 's1', label: 'Fichiers DWG', value: 100, suffix: '', delta: '+12 ce mois', color: '#007BFF' },
  { id: 's2', label: 'Conversions GLB', value: 78, suffix: '', delta: '+8 aujourd\u2019hui', color: '#40E0D0' },
  { id: 's3', label: 'À reconstruire', value: 14, suffix: '', delta: '3 urgents', color: '#7B1FA2' },
  { id: 's4', label: 'Temps moyen', value: 42, suffix: 's', delta: '-18% vs hier', color: '#00C9FF' },
];

export const conversionSeries = [
  { jour: 'Lun', conversions: 12, erreurs: 2 },
  { jour: 'Mar', conversions: 18, erreurs: 1 },
  { jour: 'Mer', conversions: 15, erreurs: 3 },
  { jour: 'Jeu', conversions: 22, erreurs: 2 },
  { jour: 'Ven', conversions: 19, erreurs: 1 },
  { jour: 'Sam', conversions: 8, erreurs: 0 },
  { jour: 'Dim', conversions: 5, erreurs: 1 },
];

export const statusDistribution = [
  { name: 'Convertis', value: 78, color: '#40E0D0' },
  { name: 'En cours', value: 6, color: '#007BFF' },
  { name: 'Reconstruction', value: 14, color: '#7B1FA2' },
  { name: 'Erreurs', value: 2, color: '#FF5252' },
];

export const files: DwgFile[] = [
  {
    id: 'f1',
    name: 'Facade_Principale_v3.dwg',
    size: '12,4 Mo',
    version: 'AutoCAD 2018',
    status: 'converti',
    progress: 100,
    updatedAt: 'Il y a 12 min',
    preview: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
  },
  {
    id: 'f2',
    name: 'Plan_Etage_R+2.dwg',
    size: '8,1 Mo',
    version: 'AutoCAD 2021',
    status: 'en_cours',
    progress: 67,
    updatedAt: 'Il y a 3 min',
    preview: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
  },
  {
    id: 'f3',
    name: 'Structure_Metallique.dwg',
    size: '24,7 Mo',
    version: 'AutoCAD 2016',
    status: 'reconstruction',
    progress: 0,
    updatedAt: 'Il y a 1 h',
    preview: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'f4',
    name: 'Amenagement_Interieur.dwg',
    size: '6,3 Mo',
    version: 'AutoCAD 2020',
    status: 'converti',
    progress: 100,
    updatedAt: 'Il y a 2 h',
    preview: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
  },
  {
    id: 'f5',
    name: 'Reseau_HVAC_ZoneB.dwg',
    size: '18,9 Mo',
    version: 'AutoCAD 2019',
    status: 'reconstruction',
    progress: 0,
    updatedAt: 'Il y a 3 h',
    preview: 'https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'f6',
    name: 'Module_Escalier_A12.dwg',
    size: '4,2 Mo',
    version: 'AutoCAD 2022',
    status: 'en_attente',
    progress: 0,
    updatedAt: 'Il y a 5 h',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
  },
  {
    id: 'f7',
    name: 'Coupe_Technique_Nord.dwg',
    size: '9,8 Mo',
    version: 'AutoCAD 2017',
    status: 'erreur',
    progress: 34,
    updatedAt: 'Il y a 6 h',
    preview: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'f8',
    name: 'Config_Showroom_3D.dwg',
    size: '15,5 Mo',
    version: 'AutoCAD 2021',
    status: 'converti',
    progress: 100,
    updatedAt: 'Hier',
    preview: 'https://images.pexels.com/photos/3862379/pexels-photo-3862379.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const statusLabels: Record<FileStatus, string> = {
  converti: 'Converti',
  en_cours: 'En cours',
  reconstruction: 'Reconstruction',
  erreur: 'Erreur',
  en_attente: 'En attente',
};

export const statusColors: Record<FileStatus, string> = {
  converti: '#40E0D0',
  en_cours: '#007BFF',
  reconstruction: '#7B1FA2',
  erreur: '#FF5252',
  en_attente: '#94A3B8',
};

export const navLinks = [
  { id: 'vue', label: 'Vue d\u2019ensemble' },
  { id: 'fichiers', label: 'Fichiers' },
  { id: 'apercu', label: 'Aperçu 3D' },
  { id: 'alertes', label: 'Alertes' },
];
