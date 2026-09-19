import {
    BehanceIcon,
    InstagramIcon,
    LinkedInIcon,
} from "@/app/components/reusables/icons";

/*
  The credit line at the foot of the form panel.

  .cgFoot pins itself with margin-top:auto rather than sticky alone:
  sticky only pins once there is something to scroll, and with the wizard
  on an early step the panel's content is shorter than its column, which
  would leave this sitting wherever the fields happened to end.
*/

const PERSON_NAME = "Aayush Raj";

const SOCIAL_LINKS = [
    {
        label: "Behance",
        href: "https://www.behance.net/AAYUSHVISUALS",
        Icon: BehanceIcon,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/aayush.visuals",
        Icon: InstagramIcon,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/aayushvz",
        Icon: LinkedInIcon,
    },
];

const FormFooter = () => (
    <div className="cgFoot">
        {/* the same avatar the portfolio's About greeting uses, not a
            second crop of the same photo: it is already sized and encoded
            for exactly this. Decorative, so alt is empty - the credit
            beside it already says whose face this is. Raw <img> rather
            than next/image: at 22px there is nothing for the optimiser to
            do to a 5KB asset. */}
        <span className="cgFoot__by">
            <img
                className="cgFoot__face"
                src="/about/avatar.webp"
                alt=""
                width={112}
                height={112}
            />
            <p className="cgFoot__credit">Made by {PERSON_NAME}</p>
        </span>

        <div className="cgFoot__socials" role="group" aria-label="Elsewhere">
            {SOCIAL_LINKS.map((s) => (
                <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="cgFoot__social"
                    aria-label={s.label}
                >
                    <s.Icon />
                </a>
            ))}
        </div>
    </div>
);

export default FormFooter;
