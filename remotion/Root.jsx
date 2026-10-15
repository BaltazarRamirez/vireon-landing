import { Composition } from "remotion";
import { Story } from "./Story.jsx";
import { MolinosStory } from "./MolinosStory.jsx";
import { VireonTalk } from "./VireonTalk.jsx";
import { GreenScreenBroll } from "./GreenScreenBroll.jsx";
import { MolinosBg } from "./MolinosBg.jsx";
import { VidaPlenaStory } from "./VidaPlenaStory.jsx";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MolinosBg"
        component={MolinosBg}
        durationInFrames={1}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VireonStory"
        component={Story}
        durationInFrames={870}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MolinosStory"
        component={MolinosStory}
        durationInFrames={620}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VidaPlenaStory"
        component={VidaPlenaStory}
        durationInFrames={2310}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="VireonTalk"
        component={VireonTalk}
        durationInFrames={1590}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GreenScreenBroll"
        component={GreenScreenBroll}
        durationInFrames={420}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
