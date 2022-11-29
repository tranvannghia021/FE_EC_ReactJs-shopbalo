import { about1, about2, imageVoNhu, imageMinhTrung, imageTanThuan, imageNghia } from '../../images/about';
export const teamData = [
  {
    id: 1,
    name: 'Võ Hoàng Quỳnh Như',
    image: imageVoNhu,
    email: 'mailto:vonhu.alien@gmail.com',
    facebook: 'https://www.fb.com/vohoangquynhnhu',
    role: 'Frontend Developer',
  },
  {
    id: 2,
    name: 'Nguyễn Đức Minh Trung',
    image: imageMinhTrung,
    email: 'vonhu.alien@gmail.com',
    facebook: 'https://www.fb.com/NguyenDucMinhTrung0110',
    role: 'Fullstack Developer',
  },
  {
    id: 3,
    name: 'Hồ Tấn Thuận',
    image: imageTanThuan,
    email: 'vonhu.alien@gmail.com',
    facebook: 'https://www.fb.com/tanthuan031',
    role: 'Fullstack Developer',
  },
  {
    id: 4,
    name: 'Trần Vãn Nghĩa',
    image: imageNghia,
    email: 'vonhu.alien@gmail.com',
    facebook: 'https://www.fb.com/TVNnghia',
    role: 'Fullstack Developer',
  },
];

export const aboutData = [
  {
    id: 1,
    isRight: true,
    title: 'Our Story',
    content: [
      `As a "rookie" in the fashion village of Local Brand. Tresor designs with lovely images with
                  bright colors are what make Tresor attractive. With its spacious size, durable natural
                  materials and sturdy strap design, it has helped the product conquer fashion lovers. Is a backpack
                  product with CHEAP price but the quality is not inferior to other brands. Tresor always
                  maintains the best quality through each product. Surely Tresor will be a product that you
                  cannot help but "pocket" right away.`,
    ],
    image: about1,
    isMap: false,
  },
  {
    id: 2,
    isRight: false,
    title: 'Our Mission',
    content: [
      `Tresor with craftsmen with over 20 years of experience, we research and understand deeply about all types of
                  backpacks. We understand every detail of the backpack how to bring the most comfort to the user, how
                  to divide it scientifically to best suit different uses. From design to quality of raw materials, each
                  stitch is carefully invested to bring the most complete products with the highest quality.`,
    ],
    image: about2,
    isMap: false,
  },
  {
    id: 3,
    isRight: true,
    title: 'Our Branches',
    content: ['Cơ sở 1:  275 An Dương Vương, Quận 5, TP HCM.', 'Cơ sở 2:   234  Tân Định, Quận 1, TP HCM'],
    image: about1,
    isMap: true,
  },
];