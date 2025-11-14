import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const defaultAnimeList = [
    {
      id: 1,
      title: "ぼっち・ざ・ろっく！",
      image: "https://image.annict.com/9-fniQ6XtSIec3Mm_MM8d5EUbVbp4NkMC856i4gt6m4/s:170:226/plain/s3://annict-user-contents/shrine/workimage/6152/image/master-c73a8c3371b3df79044691c7d31794a2.jpg@webp",
      overview: "ぼっちちゃん”こと後藤ひとりは会話の頭に必ず「あっ」って付けてしまう極度の人見知りで陰キャな少女。そんな自分でも輝けそうなバンド活動に憧れギターを始めるも友達がいないため、一人で毎日6時間ギターを弾く中学生時代を過ごすことに。上手くなったギターの演奏動画をギターヒーロー”としてネットに投稿したり文化祭ライブで活躍したりする妄想なんかをしていると、気づいたときにはバンドメンバーを見つけるどころか友達が一人も出来ないまま高校生になっていた……！ひきこもり一歩手前の彼女だったがある日“結束バンド”でドラムをやっている伊地知虹夏に声をかけられたことで、そんな日常がほんの少しずつ変わっていく――",
    },
    {
      id: 2,
      title: "葬送のフリーレン",
      image: "https://image.annict.com/_H5EL8TdeJ0ub2bZRV2QzID1Nc3XcwZDM_QdxCknpFI/s:170:226/plain/s3://annict-user-contents/shrine/workimage/6800/image/master-e11ea95bf4fdcd9d113d72be4983f966.jpg@webp",
      overview: "勇者ヒンメルたちと共に、10年に及ぶ冒険の末に魔王を打ち倒し、世界に平和をもたらした魔法使いフリーレン。千年以上生きるエルフである彼女は、ヒンメルたちと再会の約束をし、独り旅に出る。それから50年後、フリーレンはヒンメルのもとを訪ねるが、50年前と変わらぬ彼女に対し、ヒンメルは老い、人生は残りわずかだった。その後、死を迎えたヒンメルを目の当たりにし、これまで“人を知る”ことをしてこなかった自分を痛感し、それを悔いるフリーレンは、“人を知るため”の旅に出る。その旅路には、さまざまな人との出会い、さまざまな出来事が待っていた―。"
    },
    {
      id: 3,
      title: "〈物語〉シリーズ オフ&モンスターシーズン",
      image: "https://image.annict.com/2kWdWDH2Sr-nKt_ORWJrpszQVxbuI-fmRh3JFiwiwZ4/s:170:226/plain/s3://annict-user-contents/shrine/workimage/8946/image/master-619403e89d5f1043a5ad902a94c84224.jpg@webp",
      overview: "高校を卒業し、阿良々木暦の物語は終わった。今度こそ、本当に終わった。しかし暦に助けられた彼女たちの物語は、終わってはいなかった。青春の中でもがく彼女たちの、前日譚、あるいは後日談。"
    },
    {
      id: 4,
      title: "小林さんちのメイドラゴンS",
      image: "https://image.annict.com/WDFwngMUJfl4bSijQ5BtSlIA7lURn7pwC1Qy_sCl-YU/s:170:226/plain/s3://annict-user-contents/shrine/workimage/3308/image/master-c1b28ac70d067df68f133533b6ee0734.jpg@webp",
      overview: "あのはちゃめちゃドラゴンメイドが再び！ひょんなことから小林さんちのメイドとして働くことになったドラゴン・トール。大好きな小林さんに時々（嘘。たくさん）迷惑を掛けながらも、なんとか人間社会に溶け込み立派に（嘘。そこそこに）メイド業をこなしていた。同じドラゴンのカンナ、ルコア、ファフニール、エルマたちも、それぞれ自分の居場所を見つけて、人間たちと異種間コミュニケーションを満喫していた。そんなまったり、たまに激動の日々を送っていた頃。小林さんに、新たなドラゴンの脅威が襲いかかる―。"
    },
  ]
  const apiKey = import.meta.env.VITE_ANNICT_API_KEY;
  const [keyword, setKeyword] = useState("");
  const [animeList, setAnimeList] = useState([]);

  const fetchAnimeList = async () => {
    const response = await fetch(
      "https://api.annict.com/v1/works?",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ANNICT_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    setAnimeList(data.works);
    console.log(data.works);
  };

  useEffect(() => { 
    fetchAnimeList();
  }, []);

  // フェイルオーバー（fallback）画像取得関数
  const getAnimeImage = (work) => {
    const images = work.images || {};
  
    return (
      images.facebook?.og_image_url ||
      images.twitter?.image_url ||
      images.recommended_url ||
      "/no-image.png"
    );
  };

  return (
    <div>
      <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder="タイトルで検索" />
      <p>検索キーワード: {keyword}</p>
      {animeList.filter((anime) => anime.title.includes(keyword)).map((anime) => (
        <div key={anime.id}>
          <h2>{anime.title}</h2>
          <img src={getAnimeImage(anime)} alt={anime.title} />
          <p>{anime.overview}</p>
        </div>
      ))}
    </div>
  )
}

export default App
