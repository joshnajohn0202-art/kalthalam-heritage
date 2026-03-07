import { Link } from "react-router-dom";
import { useState } from "react";

import place1 from "../../assets/resort/outerimgs.webp";
import place2 from "../../assets/resort/outerimgs3.webp";
import place3 from "../../assets/resort/outerimgs 4.webp";
import place4 from "../../assets/resort/outerimgs 2.webp";
import padagiri2 from "../../assets/nearby/Padagiri View Point/Screenshot 2026-02-08 105739.png";
import padagiri3 from "../../assets/nearby/Padagiri View Point/Screenshot 2026-02-08 105820.png";
import padagiri4 from "../../assets/nearby/Padagiri View Point/Screenshot 2026-02-08 105850.png";
import padagiri5 from "../../assets/nearby/Padagiri View Point/Screenshot 2026-02-08 105927.png";
import padagiri6 from "../../assets/nearby/Padagiri View Point/Screenshot 2026-02-08 110001.png";
import padagiriCard from "../../assets/nearby/Padagiri View Point/Screenshot 2026-02-08 120917.png";
import thittu1 from "../../assets/nearby/Thittumpuram View Point/Screenshot 2026-02-08 202447.png";
import thittu2 from "../../assets/nearby/Thittumpuram View Point/Screenshot 2026-02-08 202540.png";
import thittu3 from "../../assets/nearby/Thittumpuram View Point/Screenshot 2026-02-08 202841.png";
import thittu4 from "../../assets/nearby/Thittumpuram View Point/Screenshot 2026-02-08 202935.png";
import thittu5 from "../../assets/nearby/Thittumpuram View Point/Screenshot 2026-02-08 203026.png";
import thittu6 from "../../assets/nearby/Thittumpuram View Point/Screenshot 2026-02-08 203117.png";
import avitis1 from "../../assets/nearby/Avitis View Point/Screenshot 2026-02-08 205436.png";
import avitis2 from "../../assets/nearby/Avitis View Point/Screenshot 2026-02-08 205714.png";
import avitis3 from "../../assets/nearby/Avitis View Point/Screenshot 2026-02-08 205827.png";
import avitis4 from "../../assets/nearby/Avitis View Point/Screenshot 2026-02-08 205910.png";
import komban1 from "../../assets/nearby/Kombankallu View Point/Screenshot 2026-02-08 212005.png";
import komban2 from "../../assets/nearby/Kombankallu View Point/Screenshot 2026-02-08 212057.png";
import komban3 from "../../assets/nearby/Kombankallu View Point/Screenshot 2026-02-08 212300.png";
import komban4 from "../../assets/nearby/Kombankallu View Point/Screenshot 2026-02-08 212430.png";
import komban5 from "../../assets/nearby/Kombankallu View Point/Screenshot 2026-02-08 212534.png";
import komban6 from "../../assets/nearby/Kombankallu View Point/Screenshot 2026-02-08 212551.png";
import meenam1 from "../../assets/nearby/Meenampara - Nelliyampathy Hill View Point 1/Screenshot 2026-02-08 214547.png";
import meenam2 from "../../assets/nearby/Meenampara - Nelliyampathy Hill View Point 1/Screenshot 2026-02-08 214721.png";
import meenam3 from "../../assets/nearby/Meenampara - Nelliyampathy Hill View Point 1/Screenshot 2026-02-08 214825.png";
import meenam4 from "../../assets/nearby/Meenampara - Nelliyampathy Hill View Point 1/Screenshot 2026-02-08 214946.png";
import meenam5 from "../../assets/nearby/Meenampara - Nelliyampathy Hill View Point 1/Screenshot 2026-02-08 215223.png";
import meenam6 from "../../assets/nearby/Meenampara - Nelliyampathy Hill View Point 1/Screenshot 2026-02-08 215335.png";
import seeth1 from "../../assets/nearby/seetharkundu/1.webp";
import seeth2 from "../../assets/nearby/seetharkundu/2.webp";
import seeth3 from "../../assets/nearby/seetharkundu/3.webp";
import seeth4 from "../../assets/nearby/seetharkundu/4.webp";
import seeth5 from "../../assets/nearby/seetharkundu/5.webp";
import seeth6 from "../../assets/nearby/seetharkundu/6.webp";
import seeth7 from "../../assets/nearby/seetharkundu/7.webp";
import seeth8 from "../../assets/nearby/seetharkundu/8.webp";
import seeth9 from "../../assets/nearby/seetharkundu/9.webp";
import seeth10 from "../../assets/nearby/seetharkundu/10.webp";

const images = [place1, place2, place3, place4];

const categories = [
  {
    title: "Hills, Viewpoints & Scenic Nature Spots",
    places: [
      {
        id: 1,
        name: "Padagiri View Point",
        meta: "4.4 | Nature preserve",
        openStatus: "Open until 12:00 AM",
        address:
          "GMQF+R5Q, Nenmara - Nelliyampathy Rd, Nenmara, Kerala 678508, India",
        mapUrl:
          "https://www.google.com/maps/place/Padagiri+View+Point/@10.5395998,76.6704086,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba810423476695b:0xe181b4a8af82c362!8m2!3d10.5395945!4d76.6729835!16s%2Fg%2F11dzvhxprx?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
        hours: [
          { day: "Monday", time: "12:00 AM - 12:00 AM" },
          { day: "Tuesday", time: "12:00 AM - 12:00 AM" },
          { day: "Wednesday", time: "12:00 AM - 12:00 AM" },
          { day: "Thursday", time: "12:00 AM - 12:00 AM" },
          { day: "Friday", time: "12:00 AM - 12:00 AM" },
          { day: "Saturday", time: "12:00 AM - 12:00 AM" },
          { day: "Sunday", time: "12:00 AM - 12:00 AM" },
        ],
        description:
          "Padagiri View Point is a scenic hilltop tourist attraction located along Nenmara–Nelliyampathy Road in Kerala’s Palakkad district. Positioned within the Western Ghats near Trichur, it offers panoramic views of the Pothundy Dam reservoir, forested slopes, and the mist-covered Nelliyampathy Hills that make it one of the region’s most photographed spots.\n\nLandscape and Setting\nThe viewpoint sits at a significant elevation on the route from Nenmara to the hill station of Nelliyampathy. Its vantage point allows clear views of the valley below, with tea estates and dense evergreen forests stretching into the distance. On clear mornings, visitors can often glimpse Varayadumala and other peaks that define the Palakkad Gap.\n\nVisitor Experience\nPadagiri View Point is known for its accessibility—vehicles can park close to the lookout—and for its open viewing decks that attract both locals and travelers on day trips. Frequent visitors highlight the area’s foggy ambience, cool breeze, and opportunities to spot wildlife such as elephants and gaur in the valleys below. Photographers particularly appreciate the soft light at dawn and dusk.\n\nFacilities and Access\nThe site remains open 24 hours a day, making it suitable for early-morning or late-evening visits. Basic amenities like parking and small roadside stalls are available nearby. Because it lies en route to Nelliyampathy, the viewpoint serves as a convenient rest stop for tourists exploring other attractions such as Seethargundu Viewpoint and the surrounding Nelliyampathy Reserved Forest.\n\nSignificance\nBeyond its natural beauty, Padagiri View Point holds local importance as a symbol of the region’s eco-tourism appeal. It showcases the biodiversity and landscape of Kerala’s high ranges, contributing to the area’s reputation as “Poor man’s Ooty”—a tranquil highland retreat that combines easy accessibility with dramatic mountain vistas.",
        cardImage: padagiriCard,
        images: [padagiri2, padagiri3, padagiri4, padagiri5, padagiri6],
      },
      {
        id: 2,
        name: "Thittumpuram View Point",
        meta: "4.4 | Tourist attraction",
        address: "HHCV+685, Thittumpuram, Nenmara, Kerala 678510, India",
        mapUrl:
          "https://www.google.com/maps/place/Thittumpuram+View+Point/@10.5705205,76.5907755,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba80f9073f14ee7:0xc3894a18912dc000!8m2!3d10.5705152!4d76.5933504!16s%2Fg%2F11j28fyfdq?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
        description:
          "Thittumpuram View Point is a scenic lookout point situated in Thittumpuram, Nenmara, within the Palakkad–Thrissur region of Kerala, India. Located at HHCV+685, Thittumpuram, Nenmara, Kerala 678510, it offers visitors sweeping views of the lush Western Ghats and surrounding valleys, making it a tranquil stop for travelers exploring the Nelliyampathy hill range.\n\nSetting and Landscape\nThe viewpoint lies near the Nenmara–Nelliyampathy route, an area noted for its winding mountain roads and dense greenery. From this vantage, visitors can observe tea and coffee plantations, forested slopes, and misty hilltops typical of central Kerala’s highland terrain. The region’s biodiversity and changing light conditions throughout the day make it especially appealing to nature photographers.\n\nVisitor Experience\nThittumpuram View Point serves as an accessible rest stop for those heading toward attractions such as the Nellikulangara Bhagavathi Temple and the Meenampara View Point further up the hill route. Visitors generally describe it as quiet and uncommercialized, with open spaces suitable for short breaks, picnics, or panoramic photography. The site can be reached by local roadways connecting Nenmara town with nearby rural settlements.\n\nSurroundings and Accessibility\nThe broader Nenmara–Nelliyampathy corridor features several hill viewpoints, small waterfalls, and eco-resorts, making Thittumpuram an easy addition to itineraries exploring Palakkad and Thrissur districts. Public buses and taxis from Nenmara provide straightforward access, though private vehicles are preferred for flexible timing and additional sightseeing stops along the way.",
        cardImage: thittu1,
        images: [thittu1, thittu2, thittu3, thittu4, thittu5, thittu6],
      },
      {
        id: 3,
        name: "Avitis View Point",
        meta: "4.5 | Tourist attraction",
        address: "HHRM+65G, Avitis Hospital Rd, Nenmara, Kerala 678510, India",
        mapUrl:
          "https://www.google.com/maps/place/Avitis+view+Point/@10.5905722,76.5803761,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba80f37f022c44d:0x166b4f15e87133bd!8m2!3d10.5905669!4d76.582951!16s%2Fg%2F11hy9r00xr?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
        description:
          "Avitis View Point is a scenic vantage spot situated within the campus of Avitis Institute of Medical Sciences in Nenmara, near Trichur (Thrissur), Kerala, India. Located at HHRM+65G, Avitis Hospital Road, the viewpoint offers sweeping views of the Nelliyampathy mountain ranges, combining natural tranquility with a modern healthcare environment.\n\nSetting and Ambience\nPerched atop a hill on the Avitis campus, the viewpoint provides a 360-degree panorama of the lush Palakkad valley and its surrounding hills. This serene backdrop aligns with the hospital’s philosophy of “Healing in Joint Venture with Nature,” enhancing both the visual and emotional well-being of patients and visitors alike. The location lies about 25 km from Palakkad town and roughly 45 km from Thrissur city.\n\nConnection to Avitis Institute of Medical Sciences\nAvitis View Point is part of the broader Avitis Institute of Medical Sciences complex—an advanced 200-bed tertiary-care hospital inaugurated in 2020. The institution integrates comprehensive specialties such as cardiology, neurosurgery, gastroenterology, and orthopedics, while its natural hilltop location supports a holistic model of healing.\n\nSignificance\nBeyond its clinical role, the viewpoint has become a quiet attraction for staff, patients, and visitors seeking respite amidst greenery. It symbolizes Avitis’s commitment to harmonizing medical excellence with environmental wellness, reflecting Kerala’s growing reputation as a center for medical tourism.",
        cardImage: avitis1,
        images: [avitis1, avitis2, avitis3, avitis4],
      },
      {
        id: 4,
        name: "Kombankallu View Point",
        meta: "5.0 | Tourist attraction",
        address: "HHCW+8P5, Kombankallu Rd, Kombankallu, Kerala 678510, India",
        mapUrl:
          "https://www.google.com/maps/place/Kombankallu+View+Point/@10.5707681,76.5942905,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba80fb2cc28ee05:0x557f55b0dd360fa2!8m2!3d10.5707628!4d76.5968654!16s%2Fg%2F11j0tsl4c7?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
        description:
          "Kombankallu View Point is a serene hill viewpoint and local tourist attraction located near Nenmara in the Palakkad district of Kerala, India. It offers panoramic views of lush paddy fields, distant waterfalls, and the surrounding Nelliampathy hills, making it a hidden gem for travelers seeking unspoiled natural beauty and tranquility.\n\nScenic Setting\nPerched amid rural landscapes, Kombankallu View Point is surrounded by expansive greenery and mountain backdrops characteristic of the Western Ghats. Visitors describe the area as peaceful and sparsely populated, with clear vistas ideal for photography and quiet reflection. During clear weather, cascading waterfalls can be seen on the mountain slopes, adding to the area’s picturesque charm.\n\nVisitor Experience\nThe viewpoint attracts both locals and tourists looking for an offbeat stop en route to the popular Nelliampathy hills. It remains less commercialized than other nearby attractions such as the Pothundy Dam View Point Park, giving travelers an opportunity to experience Kerala’s countryside without large crowds. The spot is best visited during early morning or late afternoon for its soft light and pleasant climate.\n\nSurrounding Attractions\nNearby points of interest include the Pothundy Dam Gardens and Ayyappankunnu View Point, both within short driving distance. These locations together form a scenic circuit that showcases the area’s blend of agricultural plains and hilly terrains. Visitors often combine these spots for a day trip from Trichur or Palakkad.\n\nAddress: HHCW+8P5, Kombankallu Rd, Kombankallu, Kerala 678510, India.",
        cardImage: komban1,
        images: [komban1, komban2, komban3, komban4, komban5, komban6],
      },
      {
        id: 5,
        name: "Meenampara - Nelliyampathy Hill View Point 1",
        meta: "4.6 | Tourist attraction | Closed",
        address:
          "GPQ7+MQW, Nelliyampathy Rd, Sitargundu Estate, Kollengode South, Kerala 678508, India",
        mapUrl:
          "https://www.google.com/maps/place/Meenampara+-+Nelliyampathy+Hill+View+Point+1/data=!4m2!3m1!1s0x3ba810bb015f1cc1:0xc9b7dfef9dd92afb?sa=X&ved=1t:155783&ictx=111",
        description:
          "Meenampara - Nelliyampathy Hill View Point 1 is a scenic hilltop viewpoint and nature attraction situated along Nelliyampathy Road within the Sitargundu Estate area of Kollengode South, Kerala, India. Overlooking lush valleys and tea estates, it offers panoramic vistas of the Nelliyampathy Hillsâ€”a popular hill station known for misty peaks, winding roads, and unspoiled greenery. The viewpoint attracts both local tourists and travelers seeking offbeat nature experiences in the Western Ghats.\n\nLandscape and Experience\nVisitors to Meenampara enjoy sweeping views of forested slopes and the plains of Palakkad below. The viewpoint is often enveloped in cool mist and strong winds, particularly during monsoon and early mornings. Reaching the spot typically involves a short off-road jeep ride or trek through the tea plantations, adding a mild sense of adventure to the visit. From the hillâ€™s crest, clear weather affords glimpses of distant villages and reservoirs such as Pothundi Dam.\n\nVisitor Insights\nThe site is appreciated for its tranquil ambiance and the opportunity to observe regional flora and fauna in a relatively untouched setting. Travelers have noted the breathtaking sunrise and sunset views and the quiet that contrasts with more commercial hill resorts. However, the approach roads can be narrow and rugged, and mobile connectivity on the hill is limitedâ€”features that enhance the sense of seclusion but require preparedness.\n\nNearby Attractions\nWithin a short distance lie other well-known view spots such as Seetharkundu Viewpoint and Padagiri View Point, each offering distinct perspectives of the same verdant escarpment. The broader region also includes coffee and tea estates, waterfalls, and trekking paths through evergreen forest.\n\nVisiting Information\nMeenampara â€“ Nelliyampathy Hill View Point 1 generally operates from 9:00 a.m. to 5:00 p.m. daily. It is located at GPQ7+MQW, Nelliyampathy Road, Sitargundu Estate, Kollengode South, Kerala 678508. Visitors typically combine it with a day trip through the Nelliyampathy Hills, making it a serene and picturesque highlight of Keralaâ€™s highland circuit.",
        cardImage: meenam1,
        images: [meenam1, meenam2, meenam3, meenam4, meenam5, meenam6],
      },
      {
        id: 6,
        name: "Seetharkundu Viewpoint",
        meta: "4.5 | Tourist attraction",
        address:
          "HP47+6Q7, Seetharkundu Viewpoint Path, Sitargundu Estate, Kollengode South, Kerala 678508",
        mapUrl:
          "https://www.google.com/maps/place/Seetharkundu+Viewpoint/data=!4m2!3m1!1s0x3ba810dc245b2587:0x9a80f489a8e7fafc?sa=X&ved=1t:155783&ictx=111",
        description:
          "Seetharkundu Viewpoint is a scenic cliff-side viewpoint and nature attraction situated along Nelliyampathy Road within the Sitargundu Estate area of Kollengode South, Kerala, India. Positioned on the forested slopes of the Western Ghats, this vantage point offers sweeping panoramas of deep valleys, plantation landscapes, and the mist-shrouded hills of Nelliyampathy. Known for its peaceful atmosphere and lesser-explored character, Seetharkundu attracts both local tourists and travelers seeking offbeat and serene nature experiences in the region.\n\nLandscape and Experience\nVisitors to Seetharkundu Viewpoint are greeted with expansive views of lush forests, rolling hills, tea and coffee plantations, and the distant plains of Palakkad. Especially during the monsoon and early mornings, the area is often cloaked in mist and cool breezes, creating an enchanting hill-station ambiance. The landscape remains largely untouched by commercialization, allowing visitors to connect deeply with the natural surroundings and observe dramatic shifts in light and cloud formations over the terrain.\n\nVisitor Insights\nThe site is appreciated for its calming environment and photogenic scenery, making it ideal for photography, contemplative breaks, and nature observation. Travelers commonly note the breathtaking views at sunrise and sunset, when sunlight drapes the valleys in golden tones. As the viewpoint is not a fully developed tourist facility, amenities are limited, and mobile network coverage may be weak â€” features that contribute to the sense of remoteness but require visitors to plan ahead.\n\nNearby Attractions\nLocated near other scenic spots along Nelliyampathy Road, Seetharkundu Viewpoint is frequently visited in combination with Meenampara â€“ Nelliyampathy Hill View Point, Padagiri View Point, and Kombankallu View Point, each offering distinct perspectives of the regionâ€™s verdant escarpments. The broader area also includes forest trails, coffee and tea estates, waterfalls, and the historic Pothundy Dam, making it suitable for a full-day hill circuit exploration.\n\nVisiting Information\nSeetharkundu Viewpoint does not have officially fixed visiting hours and is generally accessible during daylight. Visitors are advised to travel during good weather for the best visibility and to exercise caution on narrow hill roads. The viewpoint is often included as part of a Nelliyampathy Hills day trip from Nenmara and offers a peaceful and scenic highlight within Keralaâ€™s highland tourism landscape.",
        cardImage: seeth1,
        images: [seeth1, seeth2, seeth3, seeth4, seeth5, seeth6, seeth7, seeth8, seeth9, seeth10],
      },
    ],
  },
  {
    title: "Waterfalls & Natural Spots",
    places: [
      {
        id: 7,
        name: "Nelliyampathy Falls",
        meta: "4.4 | Tourist attraction",
        address:
          "GJCM+C5X, Nenmara - Nelliyampathy Rd, Kerala 678508, India",
        mapUrl:
          "https://google.com/maps/place/Nelliyampathy+Falls/data=!4m2!3m1!1s0x0:0xed70fbc1b4b1266c?sa=X&ved=1t:2428&ictx=111",
        description:
          "Nelliyampathy Falls is a seasonal roadside attraction located along the winding Ghat road that connects the town of Nenmara to the high-altitude reaches of Nelliyampathy in Kerala's Palakkad district. It serves as one of the first major natural landmarks for travelers ascending the hills, offering a refreshing stop amidst the lush Western Ghats.\n\nLandscape and Setting\nThe waterfall is situated at a moderate elevation within the Nelliyampathy Hills, where the terrain is dominated by dense evergreen forests and massive teak trees. The falls are characterized by multi-tiered cascades that tumble over jagged rock faces. During the monsoon, the water volume increases significantly, creating a mist that often blankets the surrounding Nenmara-Nelliyampathy Road.\n\nVisitor Experience\nAs a popular pitstop, the falls offer a highly accessible experience where visitors can park their vehicles and stand directly at the base of the lower tiers. The site is a favorite for photography, with the vibrant green forest backdrop and the cool, spray-filled air providing a stark contrast to the humidity of the plains below. Many travelers use this spot to take a quick break before navigating the famous 10 hairpin bends that lead to the higher estates.\n\nFacilities and Access\nThe falls are open 24 hours a day and have free admission, making them a convenient spot for budget travelers and families. While there is no dedicated parking lot, the wide shoulders of the road nearby allow for temporary stops. Basic roadside stalls selling local snacks and tea are frequently found in the vicinity during peak tourist seasons.\n\nSignificance\nNelliyampathy Falls represents the gateway to the \"Poor Man's Ooty,\" showcasing the region's raw ecological beauty. It is a vital part of the local Eco-Tourism circuit, highlighting the biodiversity of the Nelliyampathy Forest Reserve. The falls contribute to the irrigation of the paddy fields in the Palakkad plains via the nearby Pothundy Reservoir.",
        cardImage:
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepZ9VkdHaZRffYvx-j7rPI3vBF1Gw1eP8ffeaeRAsmQsG9Qk6gMK4XkV0oPpfslbIfWq9c4Iptk2NGUHFh8lbDvPd0zmwNfXORgF52nbLDXCk9wfV9I9RI9Ambev-ynwZG-Itg=s1360-w1360-h1020-rw",
        images: [
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepZ9VkdHaZRffYvx-j7rPI3vBF1Gw1eP8ffeaeRAsmQsG9Qk6gMK4XkV0oPpfslbIfWq9c4Iptk2NGUHFh8lbDvPd0zmwNfXORgF52nbLDXCk9wfV9I9RI9Ambev-ynwZG-Itg=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep5WZizqWQQv6a88iAhTGg_-kkfWlxgwtvWhJtTI6biraWA0Rkm6Lw0gdLxY9U9xAQcCE3_dPM1Jdp2ThsRbaTC_i0DlVkeg4CJsqV7pUljruPfQop8Fa6nWGdi9lX-b9ma-G8Lxg=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqz1RUDYq2UNHydKzl-kA6FvxPR6-tSgNRbyYeubw3Vq38g6qbWGVqMDlUZIBlE_NoEz5l1bAUq2M6J9XL0Xz1XT3D4t7niwe4leR4MZoISBUt31KvUjM0RTH1NqaCUHgE0haGT=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqX-aSDuQsxpXuhi309DZK6r8OomYWJSBRydatgY37jUc55SDYkwbWnn57k1rMXJc8ElwGm78aMCyUrh8HBHEU19eweUhAnuFYCT7rvee0MKa30TLd8zeJEc-52ruB0DvhU4pdxUw=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerHuWvywByVVd6iHydAAmQ2-PpNZRTtcgDpGXML2e0Kn8thqKNwT6UdhJI2XRZGH8FmfKMlHiFUPCnHlIEhvbpbxc28hTDqt9IjlhwCYofuTWF0onsprFPVko8P5kghcjrXxz4=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerCl5vwmthFAm9JL7xRMq0X7XMF7GOWOLewXq4n7cSt1YQpgmZV9_IjknMbgBCrztLObgKDeHHxzqcpBuziWW1BZz0b9ybzSWmhOFXECUgCIoaYf4nK00zMjlC3z1NnHKQpIWgN4GLFgY52=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweojDH8Sg2AAvHiFshXIWobjbQWI1lAjVM0LQqAfEf4ZkrlrQlFy6b2qjh9j_U2fAuBG5seZNA4ZolU1zaH-YTTyRqZ-G-YfFrP0CBNPPAVnKO7W4Na6nr6sItTcE-n6aZzMcHc=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoj0SklrzPhoAH-DnfOUnXcBwjlxudVeVfDpHdUBcFcrX1uN0nbSipS7arS3LlVoKoZEwA57rGzNeY4pErm88m7d9EL1Cdpmbjyxt6J6m5e47YaK5u34J_WTcjlzLOgoEjDPVd8Rw=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerTuhthUZlk8snDrgkaBf1MkKqf5XutoDlcjDf9PsTHu2TP3a6QLP-LgRd1q8GxJR0_ELY7CzOCIjiyCJJBFqin0l6kFM9aKVM8dKdaJP3vPUPnZ1KErDwYZAxbBCiJB4TyHEs=s1360-w1360-h1020-rw",
        ],
      },

      {
        id: 8,
        name: "Karapara Water Falls",
        meta: "Tourist attraction",
        address: "FJ6W+QRW, Palakkad, Kerala 678508",
        mapUrl:
          "https://google.com/maps/place/Karapara+Water+Falls/data=!4m2!3m1!1s0x0:0x2a7e1ff4e336486d?sa=X&ved=1t:2428&ictx=111",
        description:
          "Karapara Water Falls is a serene, lesser-known natural cascade nestled in the Karappara region of the Nelliyampathy Hills. Located deep within the high ranges of Palakkad, it is celebrated for its pristine environment, where the cooling spray of mountain water meets the quietude of coffee plantations and tropical rainforests.\n\nLandscape and Setting\nThe waterfall is situated near the Karappara Estate-A, roughly 1.5 km away from the iconic Karappara Hanging Bridge. It is surrounded by a rich ecological landscape featuring dense forest canopies on one side and sprawling coffee and tea estates on the other. The area is known for its pure water and is a frequent haunt for birdwatchers hoping to spot species like the Hornbill.\n\nVisitor Experience\nReaching the falls involves a scenic trek through the forest and estates. Visitors often describe the atmosphere as a \"secret paradise\" due to the low crowds compared to other popular Nelliyampathy spots. A highlight of the journey is crossing the Karappara Hanging Bridge, which offers thrills as visitors walk over a flowing stream below. The water flow is most impressive during the monsoon season, as the falls may go dry or have very little water by January.\n\nFacilities and Access\nAccess: To reach Karapara, travelers typically take a right turn at Kaikatty Junction on the way to Nelliyampathy town.\nTimings & Entry: The site is generally open 24 hours, but the Kaikatty forest check-post typically closes by 5:00 PM or 6:00 PM. There is currently no entry fee for the falls themselves.\nSafety: Vehicles can reach near the bridge area, but SUVs are recommended for the off-road sections. Visitors should be cautious on the hanging bridge, which sometimes has restricted occupancy for safety.\n\nSignificance\nKarapara is a vital part of Nelliyampathy's eco-tourism appeal, offering a more rugged and \"wild\" experience than the roadside falls. It showcases the region's raw biodiversity and serves as a quiet alternative for those looking to explore beyond the standard tourist circuit.",
        cardImage:
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepuWozPoowLokvNnQ_iQLkNIn7sgcDxPwOI7GCwpvpPKcwtK5nbJUbNdC4pF51gXx47xpuYMYCuAiEoNoKzHFIMAMlv0Hsnq2eO5cLydBIzL36eOf637cn_tQUEHkKd6zAOWN5Rng=s1360-w1360-h1020-rw",
        images: [
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepuWozPoowLokvNnQ_iQLkNIn7sgcDxPwOI7GCwpvpPKcwtK5nbJUbNdC4pF51gXx47xpuYMYCuAiEoNoKzHFIMAMlv0Hsnq2eO5cLydBIzL36eOf637cn_tQUEHkKd6zAOWN5Rng=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer6aY3dRREsFfRpOHqvzq71GjYgPG3FQmV2L5pmdWm2N0swlSUoGyCsGwjrLtPAVNzJLwj-Zpxk7hJ9Om1ZljtIJ3McfF5H1279U58KnW-XgA0K7MAT1PJBqkSqZo4ZwoqiAge3BA=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqhudPx-x2vs51R-ivotZQ5stPR1Rmlz_LoKcISbOmLy5c8gUF7QpYejDJ3DAvVlkorP7KZqPLWRorF7mbXBX4eAZGetbencuwyxh1Ynj1pAN4_XWA1dLJkQgoZrLXDLIicz1AZ=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoSovwOH4pkLvZ0qKJD5oCxZqxvqeFijpEZfxDd4LJN2KtF-GR_6kNWjOBXTcr_YHk8ZHJWw_HZ8clq5p7LShX1V4zLLKNGMjuXsBdE4KYHwTOrj_pEgU4HU6IBAybTt6MPc5kbig=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerM-za5tJTYXDaminFFO_URNM08C_pEAaUTFRqYvWcbZB5b_F8nP6MAl8fvn5d1oNW1J4qZQRLDPdCus6yDg4UVAq_FXNyAV67EB5tZmfuJ7hboXj0eRnIlsr2MejjzAS64Yr2D_A=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepo-mB5gIUmIetzBOsj3B8an--IxPSj-lg-waSPcHB35EF-jpkg2T2GjYOhb-qsY1sWZbpQ5Ve9GADW60AEPFRyvsaXeingEIkm4EjyA2w6qRfikWBPoA-UupOlTMIu18ThwDU=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweovSyVQSFjFoXOs8B2td8iPdTMekWjgmzKgS2-iNMHTPc_xF5di8B8lt7CtESqmA7cdXT90yNTM7CW1vzecHft_Hlr4DLL5d29y8ACaOMwsA3mCIK1733SgOvRG_7vUf6c0eEAtLQ=s1360-w1360-h1020-rw",
        ],
      },
      {
        id: 9,
        name: "Charpa Waterfalls",
        meta: "Tourist attraction",
        address:
          "8H3H+HVV, Athirapilly road, Pariyaram, Kerala 680721",
        mapUrl:
          "https://www.google.com/maps/place/Charpa+Waterfalls/@10.3042008,76.5786634,16z/data=!4m6!3m5!1s0x3b07f8ef6f9a7a93:0xcfd4ba8391f9ea52!8m2!3d10.3039804!4d76.5796778!16s%2Fm%2F0ll2hw6?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
        description:
          "Charpa Waterfalls is a majestic, multi-tiered seasonal cascade located in the Thrissur district of Kerala. Situated precisely between the iconic Athirappilly and Vazhachal waterfalls, it is celebrated for its unique roadside accessibility, where the roaring white waters plummet from a height of approximately 70 feet right next to the forest highway.\n\nLandscape and Setting\nThe waterfall is a prominent feature of the Sholayar ranges within the Western Ghats, a UNESCO World Heritage biodiversity hotspot. It originates from a minor tributary of the Chalakudy River and is framed by dense, lush tropical rainforests. During the peak monsoon season, the landscape transforms as the waterfall expands significantly, often creating a thick mist that sprays onto the passing road and bridge.\n\nVisitor Experience\nUnlike its larger neighbors, Charpa requires no trekking; it is a \"sensory pit stop\" where visitors can experience the raw power of nature directly from their vehicle or the roadside bridge.\nMonsoon Spectacle: From June to September, the flow is at its most ferocious, creating a cinematic \"arch of mist\" that cools the faces of travelers.\nPhotography: It is a premier spot for quick photography, especially from the bridge which offers a close-up view of the water crashing against dark rock slabs.\nWildlife: The surrounding forest is home to rare species like the Malabar pied hornbill and the Indian giant squirrel, which are frequently spotted by quiet observers.\n\nFacilities and Access\nAccess: Located on State Highway 21, approximately 3 km from Athirappilly and 2 km before Vazhachal.\nTimings: Accessible 24 hours as a roadside stop, though daylight hours (8:00 AM - 6:00 PM) are recommended for safety and visibility.\nEntry Fee: There is no separate entry fee for Charpa Falls. However, visitors must typically have the forest corridor ticket purchased at the Athirappilly or Vazhachal checkposts (approx. Rs30-50 for Indian adults).\nSafety: Swimming or climbing the rocks is strictly prohibited as they are extremely slippery, and the current can be dangerously strong during rains.\n\nSignificance\nCharpa is an essential link in the \"Athirappilly Waterfall Circuit.\" It represents the raw, untamed beauty of Kerala's river systems and serves as a vital ecological corridor for diverse flora and fauna. Its name is derived from the Malayalam word \"Charpa\", meaning rocky terrain, perfectly describing the rugged steps over which the water cascades.",
        cardImage:
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerTpWnpaNziQY8GZklg3r2owz7QQUYLjY5kdYLPIgOoLNQ89zE49cpn5dvnLrczuZ6NyZGs4-Duzwk_Qo3syR4nxpOQu6jgKj-xgbTpTKM6YuViQCCB15oaND4HeSb9e3802ZCSrQ=s1360-w1360-h1020-rw",
        images: [
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqI_ENK8m8xJXPv10sBVDmKpA2NOTSasAl6zQNnbI7LvLGA_jeJ1dRl6YMBCw181cVuDWZVqqS5U5xRx73e_8xnFVNEXDO9HmXYpB0_7OBWmy7srADlbMdIdWw8q7f2LgktWtBk0A=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweraDJ3UucUFz6OAEsFBT-hp_Nd5L6Cdy81FJRutOc6_HNBkqFe2H7h5U37HYv0lahhhnC0ceiao9kSwNAUGlgPbE2-H6IKHYL-pGj4br0av0i7fa3P4v9aM-q7I_SZY5TgKLM5U=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepwdMrZnnlnxQRj9m_A4qA1d9_EIJSXFsGxlb_eHuUkySKY1V9JFc8CFodShBlQtTaET6l4H8Y7WyeH1saVNs_xoWe9B1Igjh5RgcmK39oc3cR6lvOFQA72-H2E8iuviolgViOK=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerTpWnpaNziQY8GZklg3r2owz7QQUYLjY5kdYLPIgOoLNQ89zE49cpn5dvnLrczuZ6NyZGs4-Duzwk_Qo3syR4nxpOQu6jgKj-xgbTpTKM6YuViQCCB15oaND4HeSb9e3802ZCSrQ=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqq0Y759zudIcwaOF40A2sbrHCoSywPsJ0a2l2wlbukfwM0OJfHlePDHFMOF9ovnjNqMjkBIcFISgkKBnJngCduPtv4LmYH4xSV-fEolRY-7SKJS_TcpqS64CKB9CA8QJislo2d=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqvMJT_YHRybFNXztvla247WPBXWhVsElf9-4tR2CH42UZDM0YV8bzKdajLb4F3_SESdhfC5QzkxLM6JaRkzxqTROt-LPWo0msJlUZUMV-Iao2ePcU5l8htupKduom3595TFiQ=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweq-9l8s3r2YGipg1oRUPJmYs_0F3eXr4e7wGy8NwFDqzCdS81FqRwigemzJyOstcx9Obb1CyXfss6VnVQLTA3VwsrtngEzRK3pMj7kZ8QTXsbEqoRSnhikRXt6yY3Wm3p5aPaEJDw=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqjxDteEK_PNk1yORIRMltGSLElQbBVUEMzTHS_wN9IIyB2yxZRXAXVFoEKPmdz_cHnURrq2Wn0C3W3F1KZ34n7KNoW86sqoVMeqPGYDkWXUqDbPTLLrKBBeYcKHt9W6ZdU3YU0=s1360-w1360-h1020-rw",
        ],
      },
      {
        id: 10,
        name: "Thoomanam Waterfalls",
        meta: "Tourist attraction",
        address: "Enkakkad, Kerala, India",
        mapUrl:
          "https://www.google.com/maps/place/thoomanam+waterfalls+location/data=!4m2!3m1!1s0x3ba7e901d1a6afe9:0xcde60ee1caa07adb?sa=X&ved=1t:155783&ictx=111",
        description:
          "Thoomanam Waterfalls is a peaceful, seasonal cascade located in the Enkakad village near Wadakanchery. Often described as a \"hidden gem,\" this waterfall is celebrated for its safe, shallow waters and serene village atmosphere, making it a popular choice for families and local travelers looking for a relaxed outing away from more crowded commercial spots.\n\nLandscape and Setting\nThe waterfall originates from the Akamala forest and is nestled within a lush green landscape of rolling hills and rural plantations. Unlike the massive, rugged falls found deeper in Kerala's wilderness, Thoomanam offers a gentle, cascading flow over rocks that eventually reaches a level depth of roughly 1 metre, allowing visitors to walk through the water safely. The area is known for its biodiversity, where visitors may spot peacocks, monkeys, and various rare birds.\n\nVisitor Experience\nVisitors typically find a \"private\" and calm atmosphere, particularly on weekdays, as the falls are located off the main tourist circuit. The spot is highly recommended for swimming and bathing due to its low water force and safe depth. The environment is often used for family picnics and photography, especially during the monsoon season (June to August) when the water flow is at its peak.\n\nFacilities and Access\nAccess: It is located approximately 20 km from Thrissur town. Travelers can reach the site easily by car or bike via the Uthralikavu Temple Road.\nTimings & Entry: The site is generally listed as open 24 hours, and there is currently no entry fee or requirement for advanced tickets.\nParking: Various parking options are available nearby, including free and paid parking lots.\nAmenities: There are currently no on-site restroom facilities or changing rooms, so visitors are advised to plan accordingly.\n\nSignificance\nThoomanam Waterfalls serves as a vital eco-tourism spot for the Wadakanchery region, offering a safe and accessible natural retreat. It is important for visitors to distinguish it from the Thoovanam Waterfalls in Munnar, which is a much larger fall requiring a 4 km forest trek. Thoomanam is the preferred choice for those seeking a \"village vibe\" and easy road access.",
        cardImage:
          "https://lh3.googleusercontent.com/p/AF1QipMMC83-PAuXjpxrGa4L7f8TdC1RJchsfB3R_jIy=s1360-w1360-h1020-rw",
        images: [
          "https://lh3.googleusercontent.com/p/AF1QipMMC83-PAuXjpxrGa4L7f8TdC1RJchsfB3R_jIy=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerO7XQRCRbOsOFHpxWGNf6piASq-DbBXba890_1pqiDw0wUKAgCoSWDyq2XDarUk2012cUz-YbhC69HSA2h62qcSyFzAzrZxeitZhOBqg-mON2NzxgoQXjFs94Ev8XV-OX1ChEm=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwepUjHkuSDrXrf25zA2AXUrR0SIFOC1GNCrNgcRhkVd25-30kP14DHSpm8bRrqp6FDxtL5M3MjCVrbo8SVBB_yAzgqJGVUeZIoFSSsi-qpT295Ix__kahcId-DrY9pX5cyY_hs57OQ=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqFDlComhU_oGXwSA-p5jkmuxzMLXoIUcnC3mTyZArPyJw18cv4G9sn-nQeCHYQjY-R71sktFH571IXU9u_cl2bEQHbPSXAgpVsOK1ViVDfqN0gq3iGAHaKUEvdlPN715Cgi0A=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoI-NexVC-orAd4yXnP7VMIYCoulUBlPcsvKcleK2MXEXE1MIhYVz6114mxzfF_6olvO0T9guZ_LSdPM2H9Q6w-lTk_bhqIs9FSSfjTWD30Rh5chfYbw45eIIa2K0KcSrlOHYt0KaMagDc=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqAjXoUrVieBRC0dgtrq6GTp1Th5UkRUP7k_afO5z2Pcn852hr7hMHwzVtaFavlK4IEJ9wMh-Oq6ZqHF_HAz4AtJRPuar2dzLLDjhadJjrjU_IJ36qQ7X4wPKWfQ6NT7n3GqW7r=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwer_qFPPh1QLecZOGMI-IDt-PsavkmHzepltyssQhVAxRfuvhSWjCGQOt9fO0f-Yx43Jd7lSXAZ45-pC7J75g9unLAYdhBH5iMTlMyXMisBlfWdVpNtCDxOcxe-gv4x1-n4lGbuNwQ=s1360-w1360-h1020-rw",
        ],
      },
      {
        id: 11,
        name: "Mannathipara Waterfalls",
        meta: "Tourist attraction",
        address: "J97H+C3G, Thrissur, Kerala 680586",
        mapUrl:
          "https://www.google.com/maps/place/Mannathippara+Waterfalls/@10.6476978,76.2999865,11z/data=!4m10!1m2!2m1!1sMannathipara+Waterfalls+location+map+in+nenmara!3m6!1s0x3ba7e1383297d70d:0x74fcc81cd7f18060!8m2!3d10.6135707!4d76.3776994!15sCi9NYW5uYXRoaXBhcmEgV2F0ZXJmYWxscyBsb2NhdGlvbiBtYXAgaW4gbmVubWFyYVoxIi9tYW5uYXRoaXBhcmEgd2F0ZXJmYWxscyBsb2NhdGlvbiBtYXAgaW4gbmVubWFyYZIBEnRvdXJpc3RfYXR0cmFjdGlvbpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOaWVFbEVUeTEzUlJBQuABAPoBBAgAECU!16s%2Fg%2F11f10_897l?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
        description:
          "Mannathippara Waterfalls is a serene, seasonal natural attraction located near Elanad in the Thrissur district of Kerala. Known primarily to locals and off-beat travelers, it offers a refreshing retreat where mountain streams cascade over layered rock formations to form a scenic natural pool, perfect for a quiet dip away from the city's bustle.\n\nLandscape and Setting\nThe waterfall is set within a rural, countryside landscape characterized by dense forest patches and rolling hills. It is a multi-layered cascade that creates a natural rock pool at its base. The surrounding environment is lush and vibrant, particularly during the rainy season, providing a habitat for local wildlife like peacocks, monkeys, and giant squirrels.\n\nVisitor Experience\nVisitors often describe the spot as a \"mind-refreshing\" location, ideal for those seeking a connection with nature. The experience typically involves a short, scenic walk or jog of about 10 minutes from the nearest road to reach the falls. During the monsoon, the water flow is strong and the views are at their most spectacular, though the rocks can become slippery. It is considered a safe and family-friendly destination for bathing and cooling off.\n\nFacilities and Access\nAccess: Located approximately 5 km from Elanad town and near Wadakanchery. The final stretch requires a short trek through a local path.\nTimings & Entry: The site is generally open 24 hours, although daylight visits are recommended. There is currently no entry fee.\nSafety & Amenities: The area has no restroom facilities or shops nearby, so visitors should carry their own water and snacks.\nAccessibility: There is no wheelchair-accessible entrance or designated parking lot.\n\nSignificance\nMannathippara is a vital part of the local eco-tourism circuit in Thrissur, serving as a quieter alternative to the more famous Athirappilly or Pattathippara falls. Its significance lies in its raw, untouched beauty and its role as a seasonal \"nature's wonder\" that peaks during the Kerala monsoons.",
        cardImage:
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoIF7MYnkxm26WA0MCdUe23pgMiVWZQidt8c06VysqA9lUdvO26VMqelAsjq_Slyx6CwWEwo8mNW-iZQBdEnsWgD5U1weCX78VbkHS0YPDAB4qmKE_k2uTHZjpaj52HO7sZe3iM=s1360-w1360-h1020-rw",
        images: [
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoIF7MYnkxm26WA0MCdUe23pgMiVWZQidt8c06VysqA9lUdvO26VMqelAsjq_Slyx6CwWEwo8mNW-iZQBdEnsWgD5U1weCX78VbkHS0YPDAB4qmKE_k2uTHZjpaj52HO7sZe3iM=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep7Xw75noudmT7dxKyBZFckjbWO9pJKJv7PiG9b0gjOuW7q6HrZKFnVrVNh-4WRvzMnvDafeOcLLKJ8qsw_6DXqfpLHwsATxa8fXyYrnazh47L0nysVif3zyGRA1Fy46nY0iHVA=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqMG6eRP_3SU_DWCM9g8LXLjmKLaZJMFFWrsfMLe2QBQ8B5GpVtP9XVP1erbcwFwO9_6slMxSl0UJ-5Pyv3hT69ZLmoUaZlAnZR8Go96hjxIDewXS-wJsW6kHVOL9SQ0uH2Xc07=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweq9xets0yB3DwkNZc-JSP529I9XgaegldUsoy5SIollu-GVG9E0Ba_ngSlK8DHPC5EbnnNX4XZsQTE0_8P7nx8dS6k5GAAZRqGU1uSvzqUPxvgdsVTIXuOR20EKaCqtTPiL6yNm=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerEbqApJuEhn3y18C26pQh_yeR_19Lwrvpe--dPhGeiXlwn6bOgUnbEWm0_rKfk2CMHnts9xtI5_uHG937zRiFZJWE_4bk7Sukl2c6O0HG29fU81ex6pq8B5qYte2cvbnqjrU-S4w=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoZjE2IEkT6nSnaFMe_A4QsHjl8ZZkXtKWLeDHnxzW7j3tqMde9OkaGTW-ea6Z-s4gzCdOVuSsgqnRdpa2Q-ZYtd3sF0EOsquhFFWL1a81cY27oVSg-vkvWftelfmBg4pJsjlUd90QfchPC=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweriQgaSIfqq6OQG6-NEgwMKik0Tv4ExEL4ITwnCIjp4hwdJXYLxgH_X6WrfxTJOgvvE1GPF0ZcfGRX7w0v8J0DSBB4bxq_NGznoL71GWi0xBcOadHrqTGw6bUerWJs_ciddHHQ=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqrD9iVRhugrMnKgdy2No0W8V0ZiSIkE5etgAjVYM1R4dY57E5ivQ1NFFUd2-YDN_e4jAyouyCjou4in6KeC4-zYqP8UXJi5KKYRZfvk4CIMZ-QqM0S39InaGB4Qyb7pADsDFQ=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwep9FyoKibCXmW2uQ8Y1E9dSe3Tg9fgBHhZJ9eElTJ5cZF6_mKWChUBGK2O30islM36YrsoWJuacUty95WpL5tSzKxtTOMNFGEaeAkZ8x_39hMkHn6VeholKVeA38xpRq3T529oj5A=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwephvTUm4u7HLYJ-vxoGuTHSG6ZhauU8QP1N_w_LPgiRPkXxB2MeN74Aw6A_CCkgceg4HGKKrn0422lOJJlOdFS6RmrXSC02OU8sf9UqTI0CRFehJq7oo9cxCkrkPlKmOJvBUWVs=s1360-w1360-h1020-rw",
        ],
      },
      {
        id: 12,
        name: "Vattayi Waterfalls",
        meta: "Tourist attraction",
        address: "Elanad/Attoor and Kundukad, Thrissur, Kerala, India",
        mapUrl:
          "https://google.com/maps/place/Vattayi+Waterfalls/data=!4m2!3m1!1s0x3ba7e8a4228dff79:0x7f7ef2decc3e59c1?sa=X&ved=1t:155783&ictx=111",
        description:
          "Mannathippara & Vattayi Waterfalls are two of Thrissur's most serene, seasonal natural attractions. Located approximately 24 km apart, these off-beat spots offer refreshing retreats where mountain streams cascade over layered rock formations, providing a \"mind-refreshing\" escape into the lush countryside of Kerala.\n\nLandscape and Setting\nMannathippara (Elanad): Set within a rural landscape of dense forest patches and rolling hills near Wadakkanchery. It features a multi-layered cascade that creates a natural rock pool at its base, surrounded by vibrant greenery that hosts local wildlife like peacocks and giant squirrels.\nVattayi (Kundukad): Situated near the Poomala hill range, this three-tiered waterfall is famous for its exceptionally crystal-clear, transparent water. The setting is intimate and forested, offering a \"natural fish spa\" experience in its shallow, pebble-lined pools.\n\nVisitor Experience\nBoth locations are ideal for nature lovers seeking a connection with the outdoors away from large crowds.\nActivity: Visitors can enjoy a quiet dip or a natural shower under the falls. Vattayi is particularly noted for its safe, shallow bathing areas, while Mannathippara is favored for its scenic \"layered\" view.\nTrek: Both require a short, scenic walk (approx. 10-15 minutes) from the nearest parking point through local village paths and forest fringes.\nPeak Beauty: The experience is at its most spectacular during the monsoon (June-September). In peak summer (March-May), both falls typically dry up.\n\nFacilities and Access\nLocations:\nMannathippara: Near Elanad/Attoor, approx. 5 km from Elanad town. [680586]\nVattayi: Located in Kundukad village, approx. 15 km from Thrissur city.\nTimings & Entry: Generally open 24 hours (daylight visits highly recommended); No entry fee for either site.\nAccessibility: Neither site has wheelchair-accessible entrances or designated parking lots. Vehicles are usually parked on the roadsides.\nAmenities: Both are raw nature spots with no restroom facilities or shops. Visitors must carry their own water and snacks.\n\nSignificance\nThese falls serve as vital components of the local eco-tourism circuit, acting as quieter, untouched alternatives to the famous Athirappilly Falls. Their significance lies in their role as seasonal \"nature's wonders\" that provide essential water to the local ecosystem while offering a peaceful, sustainable tourism experience for the community.\nTravel Tip: Since they are relatively close, you can visit Vattayi in the morning and Mannathippara in the afternoon, often combining them with a stop at the Asurankundu or Poomala dams.",
        cardImage:
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoPAurQNmDTxUOqolP7lrHQ_NKonKVpCtk_PxbGrcIVJk3HQFzTaPINNEdoIsjsFoeyTsEQqGTGmbWkR0pop7pQrv0rMbcpTqAHoT9NbYK6XcRPMC7l3KN9WRRR2uY3LwW4WuGT=s1360-w1360-h1020-rw",
        images: [
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoPAurQNmDTxUOqolP7lrHQ_NKonKVpCtk_PxbGrcIVJk3HQFzTaPINNEdoIsjsFoeyTsEQqGTGmbWkR0pop7pQrv0rMbcpTqAHoT9NbYK6XcRPMC7l3KN9WRRR2uY3LwW4WuGT=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweq74Dcl7bpsHuvD0iZwjAa0jbhxcClkJcyAQlDG2DyiceIhIqBZxTIzihQvgkjvUB25LL3Ih_KRxJXbBUdIuSVnDX9o1fmjg8OJV-xhbRWxBgVnRSOtmvRWgPbs0FOUOtn-GYQZ=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoRWiDOaH0oFYViwobC5W6aRApWVYmwH7MxFOGI-V_j6ittBy9KIHemVcXUKvbwGoOm11zusBsGX7cLo9qqskfb6OQyuTFBpEmZ7eEWVWxZRRbwUtoc10qnLcwkEfEfCF_zIVM=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqri11a6v0-h604Hl9QUqQCxqWora6xnDBwb_NebKTJo99Zhjj3MZ-fpf0nZ_C8B-HZrykYTfIwmZpsVr2wG9FTQMNJHLK592--2x3XZPpSRB6-u6UxzJ2SN8muuKwkpFRKztHB=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweqhLicWvSgBz3oNqYRqRELXpbsz6QWVQrFwfug41SZFsPKjrE2HEpkvmlvx3XIX9RVkR8eVzZJmf1T60OwBSWmW5JKYOAiyhyveGfjBY-o7VvuLMNwdwigXtc4Y-S5XuSGQJbjULdJo6ag-=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweo2Y4Y2BElAE7zPR6aPRWsCovAAyGzdb4AtkzLumaotmU5rhSt70J5TDv7MNpoCtvdDYjYrSimM_RHwZBC2X18JsEnU-A9JHtUO_Ne-rV5s2aIZNG-QKwGk04zq8dTZ7L6OP1eqX0AayYXN=s1360-w1360-h1020-rw",
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweob53tKYoGhj9z6IUOMZV5KKF-lyYtb5Bh0-DOfVKuMZMiQLDoa-zI9WploLp3i_cAYtg9_ZnFk5Dzgm-37_yDX5BeinQAHYsRdz4Tr9qICPiFXogSYRt26627Sf7UsCNnNrT6c=w96-h69-n-k-no-nu",
        ],
      },
    ],
  },
  {
    title: "Temples & Spiritual Places",
    places: [
      {
        id: 14,
        name: "Nellikulangara Bhagavathi Temple",
        meta: "Temple",
        address:
          "Nenmara - Nelliyampathy Rd, Nenmara, Palakkad District, Kerala 678508",
        mapUrl:
          "https://www.google.com/maps/place/Sri+Nellikulangara+Bhagavathi+Temple/data=!4m2!3m1!1s0x0:0x6f2e95f5960f654e?sa=X&ved=1t:2428&ictx=111",
        description:
          "Nellikulangara Bhagavathi Temple is a spiritually vibrant landmark in Palakkad, famously known as the home of the Nenmara-Vallangi Vela. This traditional Kerala-style temple is dedicated to Goddess Nellikulangara Amma (an incarnation of Bhadrakali), who is revered as the guardian deity of the region.\n\nLandscape and Setting\nArchitectural Charm: The temple features classic Kerala architecture with well-maintained courtyards and serene surroundings.\nNatural Backdrop: It is located in the valley of the Nelliyampathy Hills, often serving as a spiritual gateway for travelers heading to the nearby Pothundy Dam or hill stations.\n\nVisitor Experience\nThe Nenmara-Vallangi Vela: This is the temple's crowning glory, celebrated annually on the 20th of the Malayalam month of Meenam (typically April 3-4). Often compared to the Thrissur Pooram, it features a fierce but friendly competition between the villages of Nenmara and Vallangi, culminating in massive firework displays and a procession of 30 caparisoned elephants.\nQuiet Devotion: On regular days, the temple offers a calm, meditative atmosphere ideal for those seeking a divine experience away from large crowds.\nOfferings: The primary offering (Prasadam) here is Payasam.\n\nFacilities and Access\nLocation: Situated about 28-34 km from Palakkad town and just 200m from the heart of Nemmara town.\nTimings:\nMorning: 5:00 AM - 11:00 AM\nEvening: 5:00 PM - 7:30 PM\nEntry: No entry fee. Like most traditional temples in Kerala, dress codes (typically dhoti for men and sarees/long skirts for women) are strictly followed for inner sanctum visits.\nAccessibility: Accessible by road via the Nenmara-Nelliyampathy Road. While the temple is generally accessible, it can become extremely crowded and difficult to navigate during the Vela festival.\n\nSignificance\nThe temple's origin is steeped in folklore involving a local named Kodakara Nair, who reportedly carried the Goddess from the Nelliyampathy hills on his palm-leaf umbrella. When he placed the umbrella down near the current site, it became immovable, signaling the Goddess's desire to remain there. Today, it remains a pillar of local identity and a major destination for religious tourism in North Kerala.",
        cardImage:
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerZFT8WgOsBpLb0xb8xV8zZ97oQyG4k10nkMKWNIgKCkV4Tag_CKBZ6ZmIKXcVzWjVwsDJWhqFtIYkJKdxudyU-ePbax2MvNHlOmJSPEsKapLLPxfObI4HylbBGF8s5gAPhMIxj=s1360-w1360-h1020-rw",
        images: [
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAwerZFT8WgOsBpLb0xb8xV8zZ97oQyG4k10nkMKWNIgKCkV4Tag_CKBZ6ZmIKXcVzWjVwsDJWhqFtIYkJKdxudyU-ePbax2MvNHlOmJSPEsKapLLPxfObI4HylbBGF8s5gAPhMIxj=s1360-w1360-h1020-rw",
        ],
      },
      {
        id: 15,
        name: "Perungottukavu Bhagavathy Temple",
        meta: "Temple",
        address:
          "Kizhakkummuri, Elavanchery, Palakkad District, Kerala 678508",
        mapUrl:
          "https://www.google.com/maps/place/Perungottukavu+Bhagavathy+Temple/@10.6021022,76.6562569,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba811f63172387d:0x57246c60813c0a95!8m2!3d10.6021022!4d76.6562569!16s%2Fg%2F1ydpvclbb?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
        description:
          "Perungottukavu Bhagavathy Temple is a revered spiritual sanctuary in Palakkad, steeped in centuries of tradition and legend. Dedicated to Goddess Bhadrakali, the temple is distinguished by its rare north-facing idol, a unique feature among Kali temples in Kerala.\n\nLandscape and Setting\nArchitectural Charm: The temple showcases traditional Kerala-style architecture with a rectangular srikovil and a well-maintained temple pond (Kshetra Kulam).\nNatural Backdrop: Nestled in the peaceful, agricultural village of Elavanchery, the temple lies on the slopes of Thenmala, part of the Western Ghats, offering a serene and verdant environment.\n\nVisitor Experience\nPerungottukavu Pooram: The temple's major annual event features grand elephant processions, traditional percussion like Panchavadyam, and vibrant rituals such as Kalasabhishekam.\nQuiet Devotion: Outside of festival seasons, the temple is known for its highly spiritual and peaceful atmosphere, ideal for quiet meditation and prayer.\nOfferings: Key offerings include Kadumadhura Payasam, Trikala Pooja, Ganapathy Homam, and Katina Vedi (ritual crackers).\n\nFacilities and Access\nLocation: Situated between Nemmara and Kollengode, approximately 1.4 km from the Elavanchery Village Office.\nTimings:\nMorning: 5:30 AM - 10:30 AM (Extends to 12:00 PM on Tue, Fri, Sun).\nEvening: 5:30 PM - 7:30 PM.\nEntry: No entry fee. Dress code is strictly followed: men must wear a mundu (dhoti) without shirts, while women should wear sarees, long skirts, or churidars with a dupatta.\nAccessibility: Accessible via the Pollachi-Thrissur Road; it is a 1 km walk or auto-rickshaw ride from the main road.\n\nSignificance\nThe temple's history is linked to the Zamorin Dynasty and the Rajas of Vengunad. Legend tells of a king who followed the sound of the Goddess's anklets to this spot on the Thenmala slopes, where he finally received her Poorna Darshan (complete vision) and attained moksha. Historically, the temple has played a vital role in local rituals, including the guardianship of the sacred Somalatha plant used in Soma Yaga ceremonies.",
        cardImage:
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoTV_M97nPoJjcJ-pwqRN8LIMQZ3a51cwCkfdzxzfW3XNA2xPTY3kv-Ed5huc97kTbAq0NOJdvkiRiBlCiUXRZeijULmf64STb7ODBTa3LyMgTJivul7dI9oy3Fwdpd4kw498w=s1360-w1360-h1020-rw",
        images: [
          "https://lh3.googleusercontent.com/gps-cs-s/AHVAweoTV_M97nPoJjcJ-pwqRN8LIMQZ3a51cwCkfdzxzfW3XNA2xPTY3kv-Ed5huc97kTbAq0NOJdvkiRiBlCiUXRZeijULmf64STb7ODBTa3LyMgTJivul7dI9oy3Fwdpd4kw498w=s1360-w1360-h1020-rw",
        ],
      },
      {
        id: 16,
        name: "Sree Dharmasastha Temple Trust",
        meta: "Temple",
        address: "Kizhakkummuri, Elavanchery, Palakkad District, Kerala, India",
        mapUrl:
          "https://www.google.com/maps/place/Sree+Dharmasastha+Temple+Trust/@10.6727244,76.5682334,12z/data=!4m10!1m2!2m1!1sSree+Dharmasastha+Temple+Trust!3m6!1s0x3ba80e677f6a87a9:0x894e1c0438dd416b!8m2!3d10.5790996!4d76.6042834!15sCh5TcmVlIERoYXJtYXNhc3RoYSBUZW1wbGUgVHJ1c3SSAQxoaW5kdV90ZW1wbGXgAQA!16s%2Fg%2F11cfh407l?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D",
        description:
          "In Kizhakkummuri, Elavanchery, the Pezhumpara Sree Dharmasastha Temple is a serene spiritual landmark dedicated to Lord Ayyappa, set against the tranquil backdrop of the Western Ghats' foothills.\n\nLandscape and Setting\nArchitectural Charm: A well-maintained traditional shrine, featuring a typical Kerala-style sanctum and an atmosphere of deep quietude.\nNatural Backdrop: Located in the agricultural village of Elavanchery, the temple is situated near the Nemmara-Nelliyampathy Road, surrounded by lush greenery.\n\nVisitor Experience\nDaily Rituals: Unlike many small rural shrines, this temple is known for its daily poojas performed by dedicated staff and a poojari.\nPilgrim Hub: During the Mandala season (November-December), it serves as a critical resting and prayer point for pilgrims heading to Sabarimala.\nSpiritual Peace: It is highly regarded for its peaceful environment, making it ideal for quiet meditation away from the crowds.\n\nFacilities and Access\nLocation: Found at Pezhumpara, approximately 100 metres from the Nemmara-Nelliyampathy main road.\nTimings: Generally opens around 6:00 AM; it is best to visit during morning or evening hours for darshan.\nDress Code: Traditional Kerala temple attire is expected; men should wear a mundu (dhoti) and women should wear sarees or long skirts.\nContact: For specific pooja bookings, the temple trust can be reached at +91 97472 39995.\n\nSignificance\nThe temple acts as a local guardian deity (Kaval Daivam) for the Elavanchery region. While the nearby Perungottukavu Bhagavathy Temple represents the feminine power (Shakti), this Sastha temple provides the balanced spiritual presence of Lord Ayyappa, the \"Kaliyuga Varada\".",
        cardImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqAhPYPx0RhPQt6kO2ep-mQX7Gt_2h39IiA&s",
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSqAhPYPx0RhPQt6kO2ep-mQX7Gt_2h39IiA&s",
        ],
      },
    ],
  },
];

export const touristPlaces = categories.flatMap((section) => section.places);

export default function NearbySpots() {
  const [activePlace, setActivePlace] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openPlace = (place) => {
    setActivePlace(place);
    setActiveImageIndex(0);
  };

  const closePlace = () => {
    setActivePlace(null);
    setActiveImageIndex(0);
  };

  const gallery = activePlace?.images?.length ? activePlace.images : images;
  const gallerySize = gallery.length;
  const currentImage = gallery[activeImageIndex % gallerySize];

  const goPrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallerySize) % gallerySize);
  };

  const goNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallerySize);
  };

  const getDirectionsUrl = (place) => {
    if (place.mapUrl) return place.mapUrl;
    const query = place.address || place.name;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query
    )}`;
  };

  return (
    <div style={page}>
      <div style={topRow}>
        <div>
          <h1 style={title}>Nearby Tourist Places</h1>
          <p style={subtitle}>
            Curated spots around Kalthalam Heritage for a relaxed day out.
          </p>
        </div>
        <Link to="/user/cottage" style={backBtn}>
          Back to Cottages
        </Link>
      </div>

      {categories.map((section) => (
        <div key={section.title} style={sectionBlock}>
          <h2 style={sectionTitle}>{section.title}</h2>
          <div style={grid}>
            {section.places.map((place, index) => (
              <div key={place.id} style={card}>
                <img
                  src={place.cardImage ?? place.images?.[0] ?? images[index % images.length]}
                  alt={place.name}
                  style={cardImg}
                />
                <div style={cardBody}>
                  <div style={cardHeader}>
                    <button
                      type="button"
                      style={nameLink}
                      onClick={() => openPlace(place)}
                    >
                      {place.name}
                    </button>
                    <span style={cardMeta}>{place.meta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {activePlace && (
        <div style={modalOverlay} onClick={closePlace}>
          <div style={modalCard} onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              style={modalClose}
              onClick={closePlace}
              aria-label="Close"
            >
              X
            </button>
            <div style={modalImageWrap}>
              <img
                src={currentImage}
                alt={activePlace.name}
                style={modalImage}
              />
              {gallerySize > 1 && (
                <>
                  <button
                    type="button"
                    style={{ ...navBtn, left: "12px" }}
                    onClick={goPrevImage}
                    aria-label="Previous image"
                  >
                    {"<"}
                  </button>
                  <button
                    type="button"
                    style={{ ...navBtn, right: "12px" }}
                    onClick={goNextImage}
                    aria-label="Next image"
                  >
                    {">"}
                  </button>
                  <div style={dotsRow}>
                    {gallery.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        style={{
                          ...dot,
                          ...(idx === activeImageIndex ? dotActive : null),
                        }}
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`Image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div style={modalBody}>
              <h2 style={modalTitle}>{activePlace.name}</h2>
              <p style={modalMeta}>* {activePlace.meta}</p>
              <button
                type="button"
                style={directionBtn}
                onClick={() => {
                  window.open(getDirectionsUrl(activePlace), "_blank", "noopener");
                }}
              >
                Directions
              </button>
              {activePlace.address && (
                <div style={addressRow}>
                  <span style={addressIcon}>@</span>
                  <span style={addressText}>{activePlace.address}</span>
                </div>
              )}
              {activePlace.description && (
                <p style={modalDesc}>{activePlace.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
      <div style={footer}>
        <h2 style={footerTitle}>Best Time to Visit</h2>
        <ul style={footerList}>
          <li style={footerItem}>
            Monsoon (Jun-Sep) - waterfalls and greenery at peak charm.
          </li>
          <li style={footerItem}>
            Winter (Dec-Feb) - cool, pleasant weather ideal for sightseeing and trekking.
          </li>
          <li style={footerItem}>
            Summer (Mar-May) - warm but great for high-altitude spots like viewpoints and hill drives.
          </li>
        </ul>
      </div>
    </div>
  );
}

const page = {
  padding: "24px",
};

const topRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  flexWrap: "wrap",
  marginBottom: "18px",
};

const title = {
  margin: 0,
  fontSize: "30px",
};

const subtitle = {
  marginTop: "6px",
  color: "#475569",
};

const backBtn = {
  textDecoration: "none",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5f5",
  background: "#eef2ff",
  color: "#1e3a8a",
  fontWeight: "bold",
};

const sectionBlock = {
  marginBottom: "22px",
};

const sectionTitle = {
  margin: "6px 0 12px",
  fontSize: "20px",
  color: "#0f172a",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "18px",
};

const card = {
  background: "#ffffff",
  borderRadius: "14px",
  overflow: "hidden",
  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
};

const cardImg = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
};

const cardBody = {
  padding: "14px 16px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const cardHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
};

const nameLink = {
  background: "none",
  border: "none",
  padding: 0,
  margin: 0,
  color: "#0f172a",
  fontSize: "18px",
  fontWeight: "600",
  cursor: "pointer",
  textAlign: "left",
};

const cardMeta = {
  fontSize: "12px",
  padding: "4px 8px",
  borderRadius: "999px",
  background: "#ecfeff",
  color: "#0e7490",
  fontWeight: "bold",
  textAlign: "right",
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15, 23, 42, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  zIndex: 50,
};

const modalCard = {
  background: "#fff",
  borderRadius: "14px",
  width: "min(520px, 100%)",
  maxHeight: "90vh",
  overflowY: "auto",
  boxShadow: "0 24px 60px rgba(15, 23, 42, 0.35)",
  position: "relative",
};

const modalClose = {
  position: "absolute",
  top: "10px",
  right: "12px",
  border: "none",
  background: "#e2e8f0",
  color: "#0f172a",
  width: "32px",
  height: "32px",
  borderRadius: "10px",
  fontSize: "20px",
  cursor: "pointer",
};

const modalImageWrap = {
  width: "100%",
  height: "280px",
  overflow: "hidden",
  borderTopLeftRadius: "14px",
  borderTopRightRadius: "14px",
  position: "relative",
};

const modalImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const navBtn = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  border: "none",
  background: "rgba(255, 255, 255, 0.9)",
  color: "#0f172a",
  width: "36px",
  height: "36px",
  borderRadius: "999px",
  cursor: "pointer",
  fontSize: "20px",
  fontWeight: "700",
};

const dotsRow = {
  position: "absolute",
  bottom: "10px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "6px",
  background: "rgba(15, 23, 42, 0.35)",
  padding: "6px 8px",
  borderRadius: "999px",
};

const dot = {
  width: "8px",
  height: "8px",
  borderRadius: "999px",
  border: "none",
  background: "rgba(255, 255, 255, 0.5)",
  cursor: "pointer",
};

const dotActive = {
  background: "#ffffff",
};

const modalBody = {
  padding: "16px 18px 20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const modalTitle = {
  margin: 0,
  fontSize: "22px",
  color: "#0f172a",
};

const modalMeta = {
  margin: 0,
  color: "#0f172a",
  fontWeight: "600",
};

const directionBtn = {
  alignSelf: "flex-start",
  padding: "10px 16px",
  background: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "600",
};

const addressRow = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  borderTop: "1px solid #e2e8f0",
  paddingTop: "12px",
};

const addressIcon = {
  fontSize: "18px",
};

const addressText = {
  color: "#0f172a",
  lineHeight: 1.4,
};

const modalDesc = {
  margin: 0,
  color: "#0f172a",
  lineHeight: 1.6,
  whiteSpace: "pre-wrap",
};

const infoRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "600",
  color: "#16a34a",
};

const infoIcon = {
  fontSize: "18px",
};

const infoText = {
  color: "#0f172a",
};

const hoursBlock = {
  display: "grid",
  gap: "8px",
  padding: "10px 0 6px",
  borderTop: "1px solid #e2e8f0",
  borderBottom: "1px solid #e2e8f0",
};

const hoursRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
};

const hoursDay = {
  fontWeight: "600",
  color: "#0f172a",
};

const hoursTime = {
  color: "#0f172a",
};

const footer = {
  marginTop: "28px",
  padding: "18px 20px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)",
};

const footerTitle = {
  margin: "0 0 10px",
  fontSize: "18px",
  color: "#0f172a",
};

const footerList = {
  margin: 0,
  paddingLeft: "18px",
  color: "#334155",
};

const footerItem = {
  marginBottom: "6px",
  lineHeight: 1.5,
};



