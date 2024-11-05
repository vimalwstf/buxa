"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Dropdown from "@/components/sidebar/Dropdown";
import Input from "@/components/sidebar/Input";
import Form from "@/components/sidebar/Form";
import ToggleButton from "../sidebar/ToggleButton";
import { enqueueSnackbar } from "notistack";
// import axios from "axios";

const allFormats = ["Article", "Blog Post", "Book", "Course", "Podcast"];
const focusAreas = ["Business", "Marketing", "Tech"];
const sources = ["Web", "Book", "Podcast", "YouTube"];
const timeRangeOptions = ["latest", "past_24hrs", "past_week"];

export default function ResearchSidebar({
  handleDocumentSubmit,
}: {
  handleDocumentSubmit: (
    data: [
      [
        {
          id: string;
          content: string[];
          isFavorite: boolean;
          updatedAt: string;
        },
      ],
    ],
  ) => void;
}) {
  const initialState = {
    topic: "",
    format: "",
    timeRange: "",
    focus: "",
    source: "",
    deepDive: false,
    researchFromWeb: false,
    dropdown: "",
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    topic,
    format,
    timeRange,
    focus,
    source,
    deepDive,
    // researchFromWeb,
    dropdown,
  } = state;

  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const setDropdown = (name: string) => {
    setState((prev) => ({ ...prev, dropdown: name }));
  };

  const togggleState = (name: "deepDive" | "researchFromWeb") => {
    return () => {
      setState((prev) => ({ ...prev, [name]: !prev[name] }));
    };
  };

  const setTopic = (topic: string) => {
    setState((prev) => ({ ...prev, topic: topic }));
  };
  const handleDropdownSelect = (
    type: "format" | "timeRange" | "focus" | "source",
  ) => {
    return (option: string) => {
      setState((prev) => ({ ...prev, [type]: option }));
    };
  };

  const allFieldsFilled = !!(topic && format && focus && source);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (accessToken) {
      if (allFieldsFilled) {
        // const metadata = {
        //   topic: topic.split(","),
        //   format,
        //   timeRange,
        //   focus,
        //   source,
        //   deepDive,
        //   // researchFromWeb,
        // };

        setLoading(true);
        // try {
        //   const response = await axios.post(
        //     `${process.env.NEXT_PUBLIC_SOURCE_URL}/documents/research`,
        //     { metadata },
        //     {
        //       headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //       },
        //     },
        //   );

        // if (response?.data?.status) {
        // console.log(response.data);
        // dispatch(updateCredit(response?.data?.credits));
        // const data = {
        //   id: response.data.data.id,
        //   name: response.data.data.content,
        //   modified: response.data.data.updatedAt,
        //   favourite: response.data.data.isFavorite,
        //   words: response.data.data.wordCount,
        // };
        handleDocumentSubmit({
          status: true,
          message: "Research Created Successfully",
          data: [
            [
              {
                id: 271,
                content: [
                  "<h1>Escalating Tensions: A Deep Dive into Hezbollah’s Growing War Dynamics</h1>\n<p>As the Middle East grapples with seemingly ceaseless instability, Hezbollah&#39;s evolving role in regional conflicts has drawn intense scrutiny and alarm. With a history steeped in military and political maneuvers, the organization&#39;s recent activities highlight a strategy pivoting toward more overt military confrontations and expansive regional influence. This article explores the multi-faceted dimensions of Hezbollah&#39;s current engagements, their implications for global security, and the international responses they&#39;ve elicited.</p>\n<h2>What is Hezbollah’s Role in Recent Middle Eastern Conflicts?</h2>\n<p>Established in the 1980s, Hezbollah initially emerged in response to the Israeli invasion of Lebanon. Today, it has grown from a localized militia to a potent force, recognized as a major political entity within Lebanon and an influential player throughout the Middle East. Increasingly, Hezbollah is observed not just defending Lebanese territories but actively participating in conflicts in Syria, Iraq, and beyond, supporting various pro-Iranian militias. This expansion highlights a significant shift in Hezbollah’s traditional roles, suggesting not only increased capabilities but also a broader strategic vision aligning closely with Iran’s regional ambitions.</p>\n<h2>How Has Hezbollah&#39;s Military Strategy Evolved?</h2>\n<p>Hezbollah’s military tactics have significantly transformed, reflecting both an increase in sophistication and a shift in warfare strategies. Initially known for guerilla tactics, the group now boasts an arsenal that includes advanced drones and missiles capable of striking anywhere in Israel, as displayed in their recent activities. This evolution in military prowess has allowed Hezbollah to project power far beyond its traditional sphere, altering the strategic calculus for both Israel and other regional actors concerned with Iran’s influence.</p>\n<h2>What Are the International Responses to Hezbollah’s Actions?</h2>\n<p>International reactions to Hezbollah&#39;s escalated activities are mixed, intertwyning concern with strategic geopolitical calculations. The United States and many European countries have designated Hezbollah as a terrorist organization, imposing sanctions on its members and seeking to curb its financial networks. Conversely, Russia sees Hezbollah as a critical ally in securing its interests in the Middle East, particularly in Syria. These divergent views complicate the global response, often leading to fractured or ineffective strategies in dealing with Hezbollah’s expanding influence.</p>\n<h2>What Impact Does Hezbollah’s Strength Have on Regional Stability?</h2>\n<p>Hezbollah’s strengthened military capability and extensive regional network pose profound questions about Middle East stability. The organization’s capacity to influence conflicts in neighboring countries and its key role in pro-Iranian axes significantly impact local power balances. This has repercussions for not only direct adversaries like Israel but also for Lebanon itself, where Hezbollah’s power has both political and socio-economic ramifications. As Hezbollah grows stronger, the potential for intensified conflicts increases, raising fears of broader regional wars.</p>\n<h2>Conclusion</h2>\n<p>As Hezbollah continues to adapt and expand, its trajectory remains a crucial factor in Middle Eastern geopolitics. Understanding its evolution gives insight into not only the direct conflicts but also broader strategic trends shaping the region. The international community&#39;s challenge will be crafting responses that not only counter immediate threats but also address the underlying political and socio-economic drivers of Hezbollah’s growth. Ensuring a balanced approach might be key to stabilizing what is increasingly becoming a volatile regional theater.</p>\n",
                  "<h1>Unraveling the Impact of Hezbollah&#39;s Battles: A Comprehensive Analysis</h1>\n<p>Hezbollah, the controversial Lebanon-based militant group, has been a pivotal player in regional conflicts, engaging in military operations that have implications far beyond Lebanese borders. This article takes a deep dive into the intricate web of Hezbollah’s military engagements, exploring the motivations, regional impacts, and future implications of their activities.</p>\n<h2>What Motivates Hezbollah’s Involvement in Regional Wars?</h2>\n<p>Hezbollah has positioned itself not just as a Lebanese political party but as a significant Shiite militant group involved in various regional conflicts. The organization states that its primary motivations include fighting against perceived Western imperialism and defending Shiite communities against extremist Sunni factions. Moreover, Hezbollah leaders argue that their involvement is crucial in protecting Lebanese sovereignty against Israeli encroachments. Driven by these factors, Hezbollah has expanded its influence and operational bases across the Middle East, partaking in conflicts that align with its strategic and religious interests.</p>\n<h2>How Has Hezbollah Affected Stability in the Middle East?</h2>\n<p>Hezbollah&#39;s activities have significantly impacted the political and military landscape of the Middle East. By directly engaging in the Syrian civil war, Hezbollah has not only supported the Assad regime but also solidified Iran&#39;s influence in the region, aligning with broader Shiite axis objectives. This involvement has been criticized widely by Sunni-majority countries and the West, leading to further sectarian polarization and instability across the Middle East.</p>\n<h2>What Are the Global Repercussions of Hezbollah’s Actions?</h2>\n<p>The ramifications of Hezbollah&#39;s actions on global politics are profound. Western nations, particularly the United States and members of the European Union, have labeled Hezbollah a terrorist organization, imposing economic sanctions on Lebanon, which has further strained the already beleaguered Lebanese economy. These international responses not only affect Hezbollah but also aggravate the socioeconomic conditions in Lebanon, impacting innocent civilians who find themselves caught in the crossfire of geopolitical conflicts.</p>\n<h2>How Does Hezbollah Sustain Its Military Operations?</h2>\n<p>An essential part of Hezbollah’s sustained operational capability lies in its sophisticated funding and arms networks. Supported significantly by Iran, Hezbollah receives financial aid, military training, and weapons, which are critical to its operations in Lebanon and Syria. Beyond conventional warfare, Hezbollah is also believed to be involved in various criminal enterprises, including drug trafficking and money laundering, which provide additional funding streams for its military expenditures.</p>\n<h2>What Lies Ahead for Hezbollah and the Middle East?</h2>\n<p>Predicting the future trajectory of Hezbollah and its impact on Middle Eastern stability involves considerable uncertainties. On one hand, increasing pressure from international sanctions might limit Hezbollah’s operations, while on the other, ongoing conflicts in the region could continue to serve as a platform for Hezbollah to assert its power. Additionally, the organization&#39;s entrenched position in Lebanese politics and society complicates efforts to diminish its influence solely through external pressure.</p>\n<h2>Conclusion</h2>\n<p>Hezbollah’s multifaceted role in Middle Eastern conflicts is a testament to its complex identity as part militia, part political actor. Understanding the broader implications of Hezbollah&#39;s activities requires a nuanced analysis of regional geopolitics, international relations, and internal Lebanese dynamics. As the region stands at the cusp of potential transitions, the international community remains watchful of Hezbollah’s next moves, which could redefine the strategic balance in the Middle East.</p>\n",
                  "<h1>Hezbollah&#39;s Enduring Conflict: A Deep Dive into Its Implications and Global Impact</h1>\n<p>The militant group Hezbollah has long been a significant player in Middle Eastern politics, often causing international concern due to its military capabilities and ideological stance. This article explores the various dimensions of Hezbollah, from its regional activities and alliances to the broader implications for global security.</p>\n<h2>What Drives Hezbollah&#39;s Military Engagements?</h2>\n<p>Hezbollah, officially known as the Party of God, was founded in the early 1980s with the primary aim of fighting Israeli occupation in Lebanon. However, over the decades, its agenda has evolved. Backed predominantly by Iran, Hezbollah has grown into a potent military force, often perceived as a state within a state in Lebanon. The organization engages in military actions primarily to assert Shiite dominance in the region, resist perceived Western and Israeli influence, and support Iran&#39;s strategic interests.</p>\n<p>The group&#39;s involvement in Syria, fighting alongside President Bashar al-Assad’s forces, underscores its commitment to Tehran&#39;s regional aspirations. This alliance has significantly enhanced Hezbollah&#39;s military capabilities, providing it access to sophisticated weaponry and tactical experience, yet it also entangles the group in broader regional conflicts, impacting Lebanese domestic stability.</p>\n<h2>How Does Hezbollah Influence Lebanese Politics?</h2>\n<p>Hezbollah wields considerable influence within Lebanese political spheres. As a major political party with substantial representation in the parliament and government, it plays a pivotal role in shaping national policies. Critics argue that Hezbollah&#39;s strong political presence, coupled with its military activities, compromises Lebanon&#39;s sovereignty and exacerbates internal divisions.</p>\n<p>The group’s political strategies often reflect its broader regional goals rather than solely domestic interests. This dual role as both a national political player and a proxy for Iranian interests complicates Lebanese politics, particularly in forming government coalitions and policy making, often leading to paralysis within the state&#39;s governance systems.</p>\n<h2>What Are the Global Implications of Hezbollah&#39;s Actions?</h2>\n<p>Hezbollah&#39;s actions have significant implications for global security. The organization&#39;s military strength, strategic alliances, and involvement in regional conflicts pose challenges not only to Israeli security but also to Western interests in the Middle East. Hezbollah&#39;s capacity to impact regional stability has attracted international sanctions, especially from the United States and the European Union, which label it a terrorist organization.</p>\n<p>Moreover, Hezbollah’s activities contribute to the complexity of the Syrian conflict, affecting diplomatic relations and the dynamics of international coalitions against terrorism. The group’s extensive network, including links to various militant organizations, and its role in illicit activities such as drug trafficking and money laundering, further complicate global efforts to promote peace and security in the region.</p>\n<h2>Conclusion: The Ongoing Challenge of Hezbollah</h2>\n<p>Hezbollah remains a formidable force in Middle Eastern politics, with activities that resonate far beyond Lebanon&#39;s borders. Its military prowess, political influence, and ideological commitments make it a critical player in regional conflicts, impacting broader international efforts toward stability and peace. Understanding Hezbollah&#39;s multi-dimensional role is essential for any comprehensive strategy aimed at resolving long-standing conflicts in the Middle East. As the geopolitical landscape evolves, the international community must address the challenges posed by groups like Hezbollah with nuanced strategies that consider both the regional and global implications of their actions.</p>\n",
                ],
                isFavorite: false,
                updatedAt: "2024-11-05T12:53:56.505Z",
              },
            ],
            [
              {
                id: 272,
                content: [
                  "<h1>U.S. Involvement in Hezbollah Conflict: Strategy, Implications, and International Reactions</h1>\n<h2>What Is the Nature of U.S. Involvement in the Hezbollah Conflict?</h2>\n<p>The United States has taken a multifaceted approach to the conflict involving Hezbollah, focusing on diplomatic, military, and financial strategies to undermine the organization&#39;s capabilities. In response to rising tensions and Hezbollah’s increased hostilities, the U.S. has intensified its support for allied nations and has participated indirectly through intelligence sharing and strategic military guidance. This involvement reflects a continuation of the U.S.&#39;s long-standing policy against terror organizations and their sponsors, aiming primarily to destabilize operations that threaten regional stability and U.S. national interests.</p>\n<h2>How Does This Intervention Impact U.S. Relations in the Middle East?</h2>\n<p>U.S. actions in the Hezbollah conflict hold deep implications for its diplomatic relationships in the Middle East. By actively opposing Hezbollah, the U.S. aligns more closely with Israel and Sunni Arab states like Saudi Arabia, both of whom view Hezbollah as a significant threat. However, this stance complicates relationships with other nations, including those where Hezbollah holds political influence like Lebanon, and with broader geopolitical rivals like Iran and Russia who support Hezbollah. The balance the U.S. seeks to maintain in the region is delicate, requiring nuanced diplomacy alongside its more visible military actions.</p>\n<h2>What Are the International Reactions to U.S. Involvement?</h2>\n<p>International reactions to U.S. strategies against Hezbollah are mixed. Western allies are generally supportive, appreciating the U.S.&#39;s role in combating what they agree constitutes a terror threat. However, criticism arises from several quarters, including humanitarian organizations concerned about the fallout on civilian populations and countries sympathetic to Hezbollah&#39;s political arm. These critics argue that U.S. actions could destabilize Lebanon further, leading to unintended negative consequences in a region already fraught with conflicts.</p>\n<h2>What Are the Potential Risks of U.S. Strategy?</h2>\n<p>The U.S. faces significant risks in its approach to dealing with Hezbollah. Militarily, there&#39;s always the danger that U.S. involvement escalates into a larger conflict, potentially drawing American forces into direct confrontation. Politically, aggressive actions toward Hezbollah might strengthen rather than weaken the group&#39;s standing in Lebanon and among its international supporters, portraying it as a defender against external aggression. Economically, any instability in Lebanon, a country already suffering from severe financial issues, could have ripple effects on global markets, particularly in areas involved in energy production and other critical sectors.</p>\n<h2>How Sustainable Is U.S. Policy Toward Hezbollah?</h2>\n<p>Looking forward, the sustainability of U.S. policy towards Hezbollah remains a contentious issue. Critics argue that a purely militaristic and financially restrictive approach might not be sufficient to diminish Hezbollah&#39;s influence permanently. They suggest integrating more robust political solutions that involve all stakeholders, including Lebanese communities disproportionately affected by the conflict. For U.S. strategy to be effective long-term, it must not only decrease Hezbollah&#39;s military capabilities but also address the political and social issues that fuel its support.</p>\n<p>In summary, U.S. involvement in the Hezbollah conflict demonstrates a complex interplay of military might, diplomatic strategy, and the broader geopolitical chessboard of the Middle East. The outcomes of this involvement are still unfolding, with global eyes watching closely how this strategy will impact regional stability and international relations.</p>\n",
                  "<h1>U.S. Intervention in Hezbollah Conflict: Strategy and Implications</h1>\n<p>The ongoing conflict involving Hezbollah has drawn international attention, particularly with the involvement of the United States. In a complex geopolitical landscape, U.S. intervention has raised both concerns and expectations about the future stability in the region. This article delves into the multifaceted approach of the U.S., examining its strategic execution and the broader implications of its involvement in the Hezbollah conflict.</p>\n<h2>What Prompted the U.S. to Intervene in the Hezbollah Conflict?</h2>\n<p>The United States has long viewed Hezbollah as a terrorist organization, with its activities posing significant security threats not only in the Middle East but also affecting international stability. The decision to intervene was triggered by growing evidence of Hezbollah’s expanding influence in key strategic areas, including their involvement in Syria and alleged connections with other militant groups. This intervention aligns with the U.S.&#39;s broader foreign policy goals of combating terrorism and promoting regional stability.</p>\n<h2>How is the U.S. Carrying Out Its Intervention Strategy?</h2>\n<p>The U.S. intervention employs a mix of diplomatic, financial, and military strategies. Diplomatically, the U.S. is working with international partners to isolate Hezbollah politically. Financially, extensive sanctions have been imposed to cut off funding sources to the organization, aiming to cripple its operations. Militarily, precision strikes and support to allied military forces are used to directly counteract Hezbollah&#39;s militant activities. These tactics are designed to weaken Hezbollah&#39;s infrastructure and reduce its capacity to operate effectively.</p>\n<h2>What Are the Regional Implications of the U.S. Actions?</h2>\n<p>The intervention has significant implications for regional politics. One immediate effect is the alteration of alliances and power dynamics among Middle Eastern countries. Some nations might view U.S. actions as a stabilization effort, while others could perceive them as an infringement on sovereignty, leading to heightened tensions. Economically, the sanctions imposed can also have a ripple effect, potentially impacting not only Hezbollah but also the civilian populations and the economies of countries involved in the conflict.</p>\n<h2>How Does the U.S. Intervention Impact Global Security and Diplomatic Relations?</h2>\n<p>Globally, the U.S. intervention could serve as a precedent for addressing international terrorism, influencing how other non-state actors are dealt with by countries around the world. Diplomatically, it involves delicate maneuvering as the U.S. needs to maintain its relationships with other nations involved in the Middle East while implementing measures against Hezbollah. The balance between aggressive security measures and diplomatic efforts remains a critical challenge for the U.S. administration.</p>\n<h2>Looking Forward: What Can Be Expected from U.S. Involvement?</h2>\n<p>Moving forward, the impact of U.S. intervention on Hezbollah will be closely monitored. The effectiveness of current strategies in destabilizing Hezbollah&#39;s operations will likely determine future actions. Additionally, how Hezbollah and its allies respond could either escalate or de-escalate tensions. Continual assessment and adaptation of strategies will be essential as new developments occur in this ongoing conflict.</p>\n<p>As the situation evolves, it remains to be seen how effective the U.S. will be in achieving its objectives of mitigating the threat posed by Hezbollah and contributing to regional stability. The global community watches closely, as the outcomes can significantly influence future international policies on combatting terrorism and handling conflicts involving non-state actors.</p>\n",
                  "<h1>U.S. Role in Hezbollah Conflict: Evaluating Impacts and Strategies</h1>\n<p>The involvement of the United States in the ongoing Hezbollah conflict has raised numerous discussions and concerns globally. From political repercussions to strategic alliances, the significant engagement of the U.S. shapes regional stability and international relations. This article delves into the multifaceted role of the U.S., exploring its strategies, consequences on regional dynamics, and the broader geopolitical ripple effects.</p>\n<h3>What is the Strategy Behind U.S. Intervention in the Hezbollah Conflict?</h3>\n<p>The United States has long viewed Hezbollah as a terrorist organization, posing a direct threat not only to the stability of the Middle East but also affecting U.S. interests in the region. The U.S. strategy has primarily centered around weakening Hezbollah&#39;s military capabilities and curtailing their influence. Through direct military aid to allies, stringent sanctions, and diplomatic efforts aimed at isolating the group internationally, the U.S. endeavors to diminish Hezbollah&#39;s power and mitigate Iran&#39;s influence in the region.</p>\n<p>The strategic intervention also includes intelligence-sharing with allies and support for partner forces engaging Hezbollah directly. This multi-pronged approach aims to disrupt the operational capacity of Hezbollah and cut off its funding streams, thereby limiting its ability to function effectively both militarily and politically.</p>\n<h3>How Does U.S. Involvement Impact Regional Stability?</h3>\n<p>U.S. intervention in the Hezbollah conflict has profound impacts on regional stability. On one hand, American support has been crucial for Lebanon and Israel, bolstering their defenses against Hezbollah&#39;s military strength. This support includes military aid, security assurances, and economic sanctions against Hezbollah sympathizers. Such moves are intended to protect U.S. allies and ensure that Hezbollah cannot easily threaten regional security.</p>\n<p>However, this involvement also comes with complexities, as increasing U.S. military presence can escalate tensions, potentially drawing the country deeper into conflict. The delicate balance the U.S. aims to maintain often faces criticism both domestically and internationally, particularly concerning the long-term effectiveness and humanitarian implications of its intervention strategy.</p>\n<h3>What Are the Broader Geopolitical Consequences of U.S. Actions?</h3>\n<p>The U.S. intervention has ripple effects beyond the immediate geographic locale of the Middle East. It affects U.S. relations with major powers like Russia and China, who have their own strategic interests in the region. For instance, aggressive U.S. policies against Hezbollah might push these countries to bolster their support for Iran, creating a friction point among these great powers.</p>\n<p>Moreover, U.S. actions impact international perceptions. The narrative surrounding U.S. intervention is not always positive, as some global entities view it as an unwarranted interference in regional affairs. Balancing the narrative and managing global relations becomes crucial for the U.S. to maintain its stance against Hezbollah while not alienating other international partners.</p>\n<h3>Conclusion: Evaluating the Efficacy and Future Directions</h3>\n<p>In assessing the U.S. intervention in the Hezbollah conflict, it becomes clear that while tactical successes are notable, the long-term strategy requires ongoing evaluation to adapt to the dynamically changing geopolitical landscape. As situations evolve and new challenges arise, the U.S. must assess the implications of its strategies on global politics and regional stability.</p>\n<p>Looking forward, it will be crucial for U.S. policymakers to craft approaches that not only counter threats like Hezbollah but also foster regional cooperation and stability. This includes diplomatic efforts that address the root causes of instability and prevent the growth of extremist groups. The balance of power, the diplomacy of engagement, and the strategic military decisions will all play pivotal roles in shaping the future outcomes in this complex regional conflict.</p>\n",
                ],
                isFavorite: false,
                updatedAt: "2024-11-05T12:53:56.505Z",
              },
            ],
          ],
        });
        // Reset all state variables
        setState(initialState);
        enqueueSnackbar("Document generated successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        // }
        // } catch (error) {
        // console.log(error);
        // enqueueSnackbar("Failed to generate document", {
        //   variant: "error",
        //   anchorOrigin: {
        //     vertical: "top",
        //     horizontal: "center",
        //   },
        // });
        // } finally {
        setLoading(false);
        // }
        // }
      }
    }
  };

  return (
    <Form
      heading="Research with AI"
      variant="research"
      allFilled={allFieldsFilled}
      loading={loading}
      onSubmit={handleSubmit}
    >
      {/* Topic Input */}
      <Input
        label="Topic of Interest"
        placeholder="Type topic"
        value={topic}
        setValue={setTopic}
      />

      {/* Content format dropdown */}
      <Dropdown
        name="format"
        selected={format}
        options={allFormats}
        label="Preferred content format"
        handleSelect={handleDropdownSelect("format")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* Date range picker */}
      <Dropdown
        name="timeRange"
        selected={timeRange}
        options={timeRangeOptions}
        label="Select date range"
        handleSelect={handleDropdownSelect("timeRange")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* Focus dropdown */}
      <Dropdown
        name="focus"
        selected={focus}
        options={focusAreas}
        label="Focus area"
        handleSelect={handleDropdownSelect("focus")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* Source dropdown */}
      <Dropdown
        name="source"
        selected={source}
        options={sources}
        label="Source preference"
        handleSelect={handleDropdownSelect("source")}
        dropdown={dropdown}
        setDropdown={setDropdown}
      />

      {/* Deep dive toggle */}
      <ToggleButton
        label="Deep Dive"
        isOn={deepDive}
        toggle={togggleState("deepDive")}
      />

      {/*  Research from web toggle */}
      {/* <ToggleButton
        label="Research from web"
        isOn={researchFromWeb}
        toggle={togggleState("researchFromWeb")}
      /> */}
    </Form>
  );
}
