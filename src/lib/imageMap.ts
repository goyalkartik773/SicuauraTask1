import { Product } from '../types';

const CATEGORY_IMAGES: Record<string, string[]> = {
  beauty: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=90',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=90',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=90',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=90',
    'https://images.unsplash.com/photo-1599733589046-10c005739ef9?w=800&q=90',
    'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800&q=90',
    'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=90',
    'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&q=90',
    'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&q=90',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=90',
  ],

  fragrances: [
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=90',
    'https://images.unsplash.com/photo-1547887538-047f8d6c0547?w=800&q=90',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=90',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=90',
    'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=90',
    'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&q=90',
    'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&q=90',
    'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?w=800&q=90',
    'https://images.unsplash.com/photo-1583530817132-5b2af9b87eb2?w=800&q=90',
    'https://images.unsplash.com/photo-1600612253971-57b851f97b4d?w=800&q=90',
  ],

  furniture: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=90',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=90',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=90',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=90',
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=90',
    'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=90',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=90',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=90',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=90',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=90',
  ],

  groceries: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=90',
    'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=800&q=90',
    'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=90',
    'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=800&q=90',
    'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&q=90',
    'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=90',
    'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&q=90',
    'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=90',
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&q=90',
    'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&q=90',
  ],

  'home-decoration': [
    'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=90',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=90',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=90',
    'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&q=90',
    'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=90',
    'https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=800&q=90',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=90',
    'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=90',
    'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=90',
    'https://images.unsplash.com/photo-1534349762230-e0ade4c5af6e?w=800&q=90',
  ],

  'kitchen-accessories': [
    'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=90',
    'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?w=800&q=90',
    'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&q=90',
    'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=90',
    'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&q=90',
    'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=800&q=90',
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=90',
    'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800&q=90',
    'https://images.unsplash.com/photo-1596431760496-749e64e3d3fa?w=800&q=90',
    'https://images.unsplash.com/photo-1522036047913-35ff5e30d17e?w=800&q=90',
  ],

  laptops: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=90',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=90',
    'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=90',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=90',
    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=90',
    'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=800&q=90',
    'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800&q=90',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=90',
    'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800&q=90',
    'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&q=90',
  ],

  'mens-shirts': [
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=90',
    'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=90',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=90',
    'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=90',
    'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=90',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=90',
    'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=800&q=90',
    'https://images.unsplash.com/photo-1563630423918-b58f07336ac5?w=800&q=90',
    'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=90',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90',
  ],

  'mens-shoes': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90',
    'https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=800&q=90',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=90',
    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=90',
    'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=90',
    'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=90',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=90',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=90',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=90',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=90',
  ],

  'mens-watches': [
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=90',
    'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=90',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=90',
    'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=800&q=90',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=90',
    'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&q=90',
    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=800&q=90',
    'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800&q=90',
    'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=90',
    'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&q=90',
  ],

  'mobile-accessories': [
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=90',
    'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=90',
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=90',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=90',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=90',
    'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&q=90',
    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&q=90',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=90',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=90',
    'https://images.unsplash.com/photo-1622445262460-24b240000a4a?w=800&q=90',
  ],

  'womens-bags': [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=90',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=90',
    'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=800&q=90',
    'https://images.unsplash.com/photo-1575032617751-6ddec2089882?w=800&q=90',
    'https://images.unsplash.com/photo-1590739225287-bd31519780b3?w=800&q=90',
    'https://images.unsplash.com/photo-1559563458-527698bf5295?w=800&q=90',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=90',
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=90',
    'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=800&q=90',
  ],

  'womens-dresses': [
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=90',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=90',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=90',
    'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800&q=90',
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=90',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=90',
    'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=800&q=90',
    'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=90',
    'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=90',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=90',
  ],

  'womens-jewellery': [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=90',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=90',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=90',
    'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=90',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=90',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=90',
    'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=90',
    'https://images.unsplash.com/photo-1630018548696-e1dc68a7e7af?w=800&q=90',
    'https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800&q=90',
    'https://images.unsplash.com/photo-1531995811006-35cb42e1a022?w=800&q=90',
  ],

  'womens-shoes': [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=90',
    'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=800&q=90',
    'https://images.unsplash.com/photo-1561861422-a549073e547a?w=800&q=90',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=90',
    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&q=90',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=90',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=90',
    'https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800&q=90',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=90',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&q=90',
  ],

  'womens-watches': [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=90',
    'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&q=90',
    'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&q=90',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=90',
    'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800&q=90',
    'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&q=90',
    'https://images.unsplash.com/photo-1617197818839-9f3cf8d16a61?w=800&q=90',
    'https://images.unsplash.com/photo-1559981421-3e0c0d712835?w=800&q=90',
    'https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=800&q=90',
    'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=90',
  ],

  tops: [
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=90',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=90',
    'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=90',
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=90',
    'https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800&q=90',
    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=90',
    'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=90',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=90',
    'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=800&q=90',
    'https://images.unsplash.com/photo-1624251490363-9a95b82ae5b7?w=800&q=90',
  ],

  sunglasses: [
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=90',
    'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=90',
    'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=90',
    'https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=800&q=90',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=90',
    'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=90',
    'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=90',
    'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=800&q=90',
    'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&q=90',
    'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=800&q=90',
  ],

  'sports-accessories': [
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&q=90',
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=90',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=90',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=90',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=90',
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=90',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=90',
    'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=90',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&q=90',
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=90',
  ],

  'skin-care': [
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=90',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=90',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=90',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=90',
    'https://images.unsplash.com/photo-1570194065650-d99fb4b7b92f?w=800&q=90',
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=90',
    'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=90',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=90',
    'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=90',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=90',
  ],
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=90',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=90',
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=90',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=90',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=90',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=90',
  'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800&q=90',
  'https://images.unsplash.com/photo-1476234251651-f353703a034d?w=800&q=90',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=90',
  'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800&q=90',
]

export function getProductImage(product: Partial<Product> & { id: number; category: string }): string {
  const images = CATEGORY_IMAGES[product.category] || FALLBACK_IMAGES;
  const categoryImage = images[product.id % images.length];
  
  if ((!categoryImage || categoryImage === FALLBACK_IMAGES[0]) && product.thumbnail && product.thumbnail.startsWith('http')) {
    return product.thumbnail;
  }
  
  return categoryImage;
}

export function getProductGallery(product: Partial<Product> & { id: number; category: string }): string[] {
  const images = CATEGORY_IMAGES[product.category] || FALLBACK_IMAGES;
  const categoryGallery = Array.from({ length: 4 }, (_, i) => images[(product.id + i) % images.length]);
  
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    const apiImages = product.images.filter((img: string) => img && img.startsWith('http')).slice(0, 4);
    if (apiImages.length > 0) {
      return apiImages;
    }
  }
  
  return categoryGallery;
}
