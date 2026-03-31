import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FocusAreaCard } from "@/components/FocusAreaCard";

const focusAreas = [
  {
    id: "childhood-hunger",
    iconName: "UtensilsCrossed",
    title: "Ending Childhood Hunger",
    goal: "Ensure that every child has access to nutritious meals.",
    how: "We work with schools, food banks, and community organizations to combat food insecurity and build healthier futures for Texas's youngest residents.",
    color: "bg-amber-50 text-amber-700",
    iconBg: "bg-amber-100",
    learnMore: [
      {
        title: "Prevalence of Childhood Hunger in Texas",
        content: [
          "Texas has one of the highest rates of childhood food insecurity in the United States. Approximately 1 in 5 children in Texas lives in a food-insecure household, meaning they lack consistent access to adequate nutrition.",
          "Food insecurity is especially prevalent in low-income, rural, and minority communities, where access to affordable, nutritious food is often limited. Factors like poverty, unemployment, and the high cost of living contribute to childhood hunger across the state.",
        ],
      },
      {
        title: "Government Programs",
        content: [
          "National School Lunch Program (NSLP): Texas participates in this federal program, which provides free or reduced-price meals to eligible children through partnerships with schools.",
          "School Breakfast Program (SBP): Provides free or reduced-price breakfast to eligible students. Texas schools offer breakfast in the classroom, grab-and-go options, and more.",
          "Supplemental Nutrition Assistance Program (SNAP): Provides monthly food assistance to low-income families. In Texas, a large portion of SNAP recipients are children.",
          "Summer Food Service Program (SFSP): During summer breaks, Texas schools and community organizations run summer meal sites where children can receive free nutritious meals.",
        ],
      },
      {
        title: "Nonprofit Organizations and Initiatives",
        content: [
          "Feeding Texas: This statewide network of food banks works to end hunger through programs, food distribution, and advocacy. Their School Pantry Program provides food directly to schools.",
          "No Kid Hungry Texas: This campaign partners with local organizations, schools, and government agencies to expand meal programs, advocate for food policy changes, and raise funds.",
          "Texas Hunger Initiative (THI): Based at Baylor University, THI collaborates with government agencies, nonprofits, and community groups to create sustainable solutions to food insecurity.",
        ],
      },
      {
        title: "School-Based and After-School Programs",
        content: [
          "Backpack Programs: Many Texas schools partner with food banks to send children home with backpacks full of food for the weekends.",
          "After-School Meal Programs: Schools and after-school centers provide snacks and meals through the Child and Adult Care Food Program (CACFP).",
          "School Gardens and Nutrition Education: Schools across Texas are increasingly incorporating gardening and nutrition programs, teaching children about healthy eating while providing access to fresh produce.",
        ],
      },
      {
        title: "How Texans Can Get Involved",
        content: [
          "Volunteer with Local Food Banks: Food banks across Texas rely on volunteers to sort and distribute food to families in need.",
          "Support Backpack Programs: Community members can donate food, funds, or volunteer hours to support backpack programs in local schools.",
          "Advocate for Policy Change: Texans can support policies that fund and expand food assistance programs, including SNAP and child nutrition programs.",
          "Donate to Hunger Relief Organizations: Contributions to organizations like Feeding Texas, No Kid Hungry Texas, and local food banks help sustain and expand programs.",
        ],
      },
    ],
  },
  {
    id: "childhood-dreams",
    iconName: "Star",
    title: "Fostering Childhood Dreams",
    goal: "Empower every child to dream and pursue a bright future.",
    how: "We partner with programs that provide educational resources, mentorship, and opportunities for children to explore their potential.",
    color: "bg-orange-50 text-orange-700",
    iconBg: "bg-orange-100",
    learnMore: [
      {
        title: "Educational Support and Scholarship Programs",
        content: [
          "Texas Education Agency (TEA): Supports childhood aspirations by implementing educational programs that promote STEM, arts, and career readiness across K-12 schools.",
          "Texas 4-H and FFA: Youth organizations geared towards young people interested in agriculture, leadership, and community service, offering scholarships to continue their education.",
          "Houston Livestock Show and Rodeo Scholarships: Offers substantial scholarships to Texas youth pursuing college degrees, especially those involved in agriculture and livestock.",
          "STEM Programs: Programs like NASA's High School Aerospace Scholars (HAS) in Texas offer unique opportunities for students interested in science, technology, engineering, and mathematics.",
        ],
      },
      {
        title: "Arts and Creative Expression",
        content: [
          "Texas Cultural Trust: Through its Young Masters Program, provides financial support for students in grades 8-11 to pursue artistic dreams in visual arts, music, dance, and theater.",
          "Texas Commission on the Arts: Provides grants and resources for students interested in performing and visual arts, as well as workshops, camps, and after-school programs.",
          "Community Arts Centers: Many Texas cities have community arts centers offering low-cost or free classes in visual arts, dance, and theater.",
        ],
      },
      {
        title: "Sports and Athletics Programs",
        content: [
          "Texas Amateur Athletic Federation (TAAF): Offers a variety of youth sports leagues and competitions across the state, including swimming, basketball, soccer, and track and field.",
          "Special Olympics Texas: For children with intellectual disabilities, provides year-round training and competitions in multiple sports, fostering inclusion and building confidence.",
          "Little League Baseball and Football: Texas has strong community support for Little League teams and Pop Warner Football.",
        ],
      },
      {
        title: "Community Support and Mentorship",
        content: [
          "Big Brothers Big Sisters of Central Texas: Pairs children with adult mentors who help them explore their interests, build confidence, and set goals.",
          "Boys and Girls Clubs of Greater Texas: Provides safe spaces for young people to engage in after-school programs covering sports, arts, homework help, and leadership development.",
          "YMCA Youth Development Programs: Runs youth leadership programs, summer camps, and sports leagues that encourage young people to pursue their goals.",
        ],
      },
      {
        title: "How Texans Can Support Childhood Dreams",
        content: [
          "Volunteer or Mentor: Programs such as Big Brothers Big Sisters, Boys and Girls Clubs, and school mentorship programs welcome volunteers who can provide support and guidance.",
          "Donate to Local Programs: Supporting local programs financially helps them expand their reach and provide more opportunities.",
          "Advocate for Youth Funding in Schools: Supporting policies that fund arts, sports, and STEM education ensures that children have access to these resources.",
        ],
      },
    ],
  },
  {
    id: "domestic-violence",
    iconName: "Shield",
    title: "Domestic Violence Prevention and Awareness",
    goal: "Break the cycle of domestic violence through outreach, education, and support services.",
    how: "We connect survivors with safe, supportive resources to help them rebuild their lives.",
    color: "bg-purple-50 text-purple-700",
    iconBg: "bg-purple-100",
    learnMore: [
      {
        title: "Prevalence of Domestic Violence in Texas",
        content: [
          "Texas ranks among the states with higher rates of domestic violence, with an estimated 1 in 3 women and 1 in 4 men experiencing intimate partner violence in their lifetime.",
          "Family violence affects Texans of all ages, with an estimated 1 in 15 children exposed to domestic violence each year. Exposure to violence has serious, long-term impacts on children's mental health, development, and future relationships.",
        ],
      },
      {
        title: "Legal Protections and Legislation",
        content: [
          "Protective Orders: Texas law allows survivors of domestic violence to file for protective orders, which restrict an abuser's ability to contact or approach the survivor.",
          "Family Violence Prevention Services Act (FVPSA): Provides federal funding for state and local organizations that support survivors through crisis intervention, legal assistance, and emergency shelter services.",
          "Recent Legislation: Texas lawmakers have passed laws that increase funding for domestic violence shelters, strengthen protections for survivors, and streamline processes for filing protective orders.",
        ],
      },
      {
        title: "Organizations and Resources for Survivors",
        content: [
          "Texas Council on Family Violence (TCFV): A statewide organization working to end family violence by providing resources, training, and advocacy.",
          "Texas Advocacy Project: Offers free legal assistance and resources to survivors of domestic violence, sexual assault, and stalking.",
          "SAFE Alliance: Based in Austin, provides housing, legal advocacy, counseling, and education for survivors of domestic violence and sexual assault.",
        ],
      },
      {
        title: "Shelters and Crisis Intervention",
        content: [
          "There are over 80 domestic violence shelters across Texas, including in major cities like Dallas, Houston, San Antonio, and Austin.",
          "24/7 Crisis Hotlines: Many Texas-based organizations operate hotlines, including the National Domestic Violence Hotline (1-800-799-SAFE).",
          "Transitional Housing Programs: Available through some Texas organizations for survivors who need longer-term safe living arrangements.",
        ],
      },
      {
        title: "How Texans Can Get Involved",
        content: [
          "Volunteer or Donate: Organizations including TCFV, SAFE Alliance, and local shelters accept donations and welcome volunteers.",
          "Educate and Advocate: Supporting education initiatives in schools, workplaces, and communities is key to changing attitudes toward domestic violence.",
          "Participate in Community Events: Joining events like the annual Walk a Mile in Her Shoes or Domestic Violence Awareness Month activities raises awareness.",
        ],
      },
    ],
  },
  {
    id: "suicide-prevention",
    iconName: "Heart",
    title: "Suicide Prevention and Awareness",
    goal: "Address mental health through suicide prevention efforts and mental health resources.",
    how: "Our initiatives focus on providing guidance and access to critical support for those in crisis.",
    color: "bg-rose-50 text-rose-700",
    iconBg: "bg-rose-100",
    learnMore: [
      {
        title: "Statistics and Demographics",
        content: [
          "Suicide is a leading cause of death in Texas, with particular prevalence among teens, veterans, and individuals in rural areas.",
          "Texas consistently sees higher suicide rates among men, especially middle-aged men, as well as elevated rates among Native American, Black, and LGBTQ+ youth.",
        ],
      },
      {
        title: "Legislation and Statewide Initiatives",
        content: [
          "House Bill 18 and Senate Bill 11: Passed in 2019, these bills require Texas public schools to incorporate mental health education and suicide prevention training into health curriculums.",
          "Jason Flatt Act: Enacted in Texas in 2015, this legislation mandates annual suicide prevention training for all school personnel.",
          "Suicide Prevention Task Force: Led by the Texas Health and Human Services Commission, develops statewide strategies to improve mental health care access.",
        ],
      },
      {
        title: "Support and Advocacy Organizations",
        content: [
          "Mental Health America of Greater Houston: Promotes mental health education and supports statewide suicide prevention initiatives.",
          "Texas Suicide Prevention Council (TSPC): A coalition dedicated to reducing the state's suicide rates through training, awareness campaigns, and resources.",
          "NAMI Texas: Provides mental health support groups, family education, and advocacy for suicide prevention.",
        ],
      },
      {
        title: "Crisis Intervention Resources",
        content: [
          "988 Suicide & Crisis Lifeline: Texans can dial 988 to connect with trained counselors who provide immediate crisis intervention and mental health support.",
          "Veterans Crisis Line: Texas veterans and their families can contact 1-800-273-8255, press 1, to speak with trained responders.",
          "Telehealth Services: Texas has expanded telehealth services to reach rural and underserved populations for therapy, counseling, and crisis support.",
        ],
      },
      {
        title: "How Texans Can Get Involved",
        content: [
          "Participate in Community Events: Join Out of the Darkness Walks or Suicide Prevention Month activities to spread awareness and raise funds.",
          "Get Trained in Mental Health First Aid: Learn how to recognize signs of suicide risk and provide initial support.",
          "Advocate for Mental Health Funding: Support legislation that increases funding for mental health resources in schools, workplaces, and communities.",
        ],
      },
    ],
  },
  {
    id: "ptsd",
    iconName: "HandHeart",
    title: "PTSD Prevention and Awareness",
    goal: "Aid those affected by PTSD, including veterans, sexual assault and domestic violence survivors, and first responders.",
    how: "We fund programs aimed at providing crucial resources to support their healing.",
    color: "bg-emerald-50 text-emerald-700",
    iconBg: "bg-emerald-100",
    learnMore: [
      {
        title: "Prevalence of PTSD in Texas",
        content: [
          "PTSD affects a significant portion of Texans, with a higher prevalence among military veterans, survivors of abuse or violence, first responders, and people affected by natural disasters.",
          "Texas, home to some of the largest military bases in the country, has a high veteran population, making PTSD a particularly relevant issue in the state.",
        ],
      },
      {
        title: "Legislation and Policy Initiatives",
        content: [
          "Veterans Mental Health Program (VMHP): Texas has a specific program to support veterans with PTSD through peer-to-peer counseling, mental health services, and crisis intervention.",
          "House Bill 1351: Texas legislation provides benefits for first responders diagnosed with PTSD due to work-related trauma, recognizing the condition as a compensable injury under workers' compensation law.",
          "Public Safety and Mental Health Partnerships: Texas promotes collaboration between public safety and mental health departments to provide trauma-focused training and support.",
        ],
      },
      {
        title: "Awareness and Advocacy Organizations",
        content: [
          "Texas Veterans Commission: Provides resources and support for veterans struggling with PTSD, offering counseling services, family resources, and help accessing VA benefits.",
          "NAMI Texas: Runs programs to increase awareness of PTSD, providing educational resources, peer-support groups, and family support.",
          "Texas Health and Human Services (HHS): Offers information, referral services, and mental health resources for people with PTSD.",
        ],
      },
      {
        title: "Support Services",
        content: [
          "Veteran-Specific Support: Texas offers veteran-focused services through the VA, Texas Veterans Commission, and local veterans' organizations including peer support groups and therapy.",
          "First Responder Support Programs: Many police and fire departments across Texas have integrated mental health programs for first responders dealing with trauma.",
          "Telehealth Services: Texas has expanded telehealth options for PTSD-specific therapies like CBT and EMDR.",
          "Crisis Hotlines: Texas Mental Health Support Line (833-986-1919), National Suicide Prevention Lifeline (988), and Veteran Crisis Line (1-800-273-8255, press 1).",
        ],
      },
      {
        title: "How Texans Can Get Involved",
        content: [
          "Volunteer with PTSD Advocacy Groups: Many Texas-based organizations accept volunteers for awareness events, support groups, and educational outreach.",
          "Support PTSD Awareness Campaigns: Participate in PTSD Awareness Month events in June to promote understanding.",
          "Encourage Conversations: Talking openly about PTSD and sharing information about resources can help reduce stigma.",
        ],
      },
    ],
  },
  {
    id: "sexual-assault",
    iconName: "Ribbon",
    title: "Sexual Assault Prevention and Awareness",
    goal: "Prevent sexual violence and empower survivors.",
    how: "Through legal advocacy, survivor services, and community education, we work to create safe, respectful environments.",
    color: "bg-teal-50 text-teal-700",
    iconBg: "bg-teal-100",
    learnMore: [
      {
        title: "Prevalence of Sexual Assault in Texas",
        content: [
          "Texas has one of the highest rates of reported sexual violence in the United States, with an estimated 2 in 5 women and 1 in 5 men experiencing sexual assault in their lifetimes.",
          "College students, individuals in rural communities, LGBTQ+ individuals, and Native American women face disproportionate rates of sexual violence in Texas.",
        ],
      },
      {
        title: "Legislation and Policy Support",
        content: [
          "Sexual Assault Survivors' Task Force (SASTF): Created in 2019, SASTF advises the state legislature on policies to improve survivor care and enhance support for law enforcement.",
          "House Bill 8 (Lavender Law): Passed in 2021, this law reforms the rape kit backlog by requiring timely processing of evidence.",
          "Human Trafficking and Sexual Assault Prevention Measures: Texas has enacted several laws focusing on human trafficking, which often overlaps with sexual assault.",
        ],
      },
      {
        title: "Advocacy and Support Organizations",
        content: [
          "Texas Association Against Sexual Assault (TAASA): One of the leading advocacy organizations in Texas, working to prevent sexual violence through education, outreach, and legislative advocacy.",
          "Rape Crisis Centers: Texas has numerous rape crisis centers offering immediate support, counseling, and advocacy for survivors, including SafePlace (Austin), Houston Area Women's Center, and Dallas Area Rape Crisis Center.",
          "Texas Council on Family Violence (TCFV): Also addresses sexual violence, providing resources, trainings, and support to survivors.",
        ],
      },
      {
        title: "Prevention Programs",
        content: [
          "Consent Education: Many Texas organizations and schools are implementing programs to educate youth about consent, healthy relationships, and respect.",
          "Sexual Assault Awareness Month (April): Organizations across Texas host events, workshops, and public information campaigns.",
          "Bystander Intervention Training: Programs like Green Dot and Step Up Texas teach people how to intervene safely when they witness potentially harmful behavior.",
        ],
      },
      {
        title: "How Texans Can Get Involved",
        content: [
          "Volunteer and Advocate: Many organizations welcome volunteers to assist with advocacy, awareness events, or crisis support.",
          "Participate in Awareness Events: Attending rallies, workshops, and Take Back the Night events helps spread awareness.",
          "Educate and Promote Prevention: Engage in conversations about consent, respecting boundaries, and supporting bystander intervention training.",
        ],
      },
    ],
  },
  {
    id: "autism",
    iconName: "Brain",
    title: "Autism Awareness",
    goal: "Promote autism acceptance and inclusivity.",
    how: "We provide resources, support, and opportunities for growth to ensure all individuals and families affected by autism can thrive.",
    color: "bg-blue-50 text-blue-700",
    iconBg: "bg-blue-100",
    learnMore: [
      {
        title: "Prevalence and Statistics",
        content: [
          "The CDC estimates that 1 in 36 children in the U.S. is diagnosed with Autism Spectrum Disorder (ASD). In Texas, that prevalence is mirrored, affecting a significant number of families.",
          "Texas has a large and diverse population, making autism services and awareness campaigns essential to ensure equitable support across various communities.",
        ],
      },
      {
        title: "Legislation and Support Programs",
        content: [
          "Texas Autism Council: Advises the state government on autism-related services and makes recommendations for improving them.",
          "Medicaid and Insurance Coverage: Texas requires certain insurance providers to cover therapies for autism, including Applied Behavior Analysis (ABA), up to a certain age.",
          "House Bill 1 and Senate Bill 55: Recent legislation has allocated funds for autism research, diagnosis, and intervention services.",
        ],
      },
      {
        title: "Advocacy Organizations",
        content: [
          "Autism Society of Texas: Provides support, education, and resources for families affected by autism. They organize events, webinars, and community activities.",
          "Texas Autism Collaborative: Brings together experts and stakeholders to promote research, advocacy, and professional development related to autism.",
          "Local Support Groups: Many local chapters and autism support groups are present in cities across Texas, offering workshops, support groups, and advocacy events.",
        ],
      },
      {
        title: "Educational and Support Resources",
        content: [
          "Texas Education Agency (TEA): Provides guidelines and resources for schools to better serve students with autism, including professional development for teachers.",
          "Early Childhood Intervention (ECI): Texas offers early intervention services for children up to age three who may show early signs of autism.",
          "Inclusive Recreation Programs: Some Texas cities offer inclusive sports programs, sensory-friendly events, and specialized camps for individuals with autism.",
        ],
      },
      {
        title: "How Texans Can Get Involved",
        content: [
          "Volunteer: Many autism organizations in Texas rely on volunteers for events, support groups, and awareness campaigns.",
          "Donate: Donating to local and national autism advocacy organizations helps fund resources, research, and community support.",
          "Participate in Events: Attending awareness walks, community events, or informational sessions helps spread autism awareness and promotes acceptance.",
        ],
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[600px] lg:min-h-[720px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/about-hero.png')" }}
        />
        <div className="absolute inset-0 bg-navy/55" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 lg:pt-48 pb-24 sm:pb-32 text-center text-white">
          <p className="text-gold font-medium tracking-wider uppercase text-sm mb-4">
            About Us
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Building a Stronger, More Compassionate Texas
          </h1>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            The Texas Philanthropy Network is a collaborative alliance committed
            to addressing Texas&apos;s most pressing social challenges.
          </p>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 80L60 73.3C120 66.7 240 53.3 360 48C480 42.7 600 45.3 720 50.7C840 56 960 64 1080 64C1200 64 1320 56 1380 52L1440 48V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
              className="fill-cream"
            />
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold-dark font-medium tracking-wider uppercase text-sm mb-3">
                Our Mission
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-6">
                Turning Generosity Into{" "}
                <span className="text-gold-dark">Tangible Impact</span>
              </h2>
              <p className="text-warm-gray text-lg leading-relaxed mb-6">
                The Texas Philanthropy Network is a collaborative alliance
                committed to addressing Texas&apos;s most pressing social
                challenges. By uniting philanthropists and nonprofits across
                Texas, we strive to build a safer, healthier, and more hopeful
                state for all.
              </p>
              <p className="text-warm-gray text-lg leading-relaxed">
                Together, we turn generosity into tangible impact. Join us on
                this journey to build a stronger, more compassionate Texas.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-sm border border-cream-dark">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-xl bg-cream">
                  <div className="text-3xl font-bold text-navy font-serif">
                    7
                  </div>
                  <div className="text-sm text-warm-gray mt-1">Focus Areas</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-cream">
                  <div className="text-3xl font-bold text-navy font-serif">
                    3
                  </div>
                  <div className="text-sm text-warm-gray mt-1">
                    Board Members
                  </div>
                </div>
                <div className="text-center p-6 rounded-xl bg-cream col-span-2">
                  <div className="text-3xl font-bold text-gold-dark font-serif">
                    100%
                  </div>
                  <div className="text-sm text-warm-gray mt-1">
                    Financial Transparency
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-gold-dark font-medium tracking-wider uppercase text-sm mb-3">
              Our Focus Areas
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy mb-4">
              Seven Pillars of Change
            </h2>
            <p className="text-warm-gray text-lg">
              We address Texas&apos;s most critical social challenges through
              targeted programs and direct community support.
            </p>
          </div>

          <div className="space-y-8">
            {focusAreas.map((area, index) => (
              <FocusAreaCard
                key={area.id}
                id={area.id}
                iconName={area.iconName}
                title={area.title}
                goal={area.goal}
                how={area.how}
                iconBg={area.iconBg}
                iconColor={area.color.split(" ")[1]}
                learnMore={area.learnMore}
                reversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6">
            Join Us on This Journey
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            By uniting philanthropists and nonprofits across Texas, together we
            turn generosity into tangible impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold hover:bg-gold-light text-navy font-semibold rounded-lg transition-colors text-lg"
            >
              Make a Donation
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              href="/requests"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 hover:border-white/40 text-white rounded-lg transition-colors text-lg"
            >
              Request Assistance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
