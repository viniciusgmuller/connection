import Image from 'next/image';

export interface Participant {
  name: string;
  role: string;
  company: string;
  image?: string;
}

interface ParticipantCardProps {
  participant: Participant;
  variant?: 'dark' | 'brown';
}

export function ParticipantCard({ participant, variant = 'dark' }: ParticipantCardProps) {
  const initials = participant.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const isBrown = variant === 'brown';

  return (
    <div className="flex flex-col items-center text-center py-3 px-2">
      {/* Photo */}
      <div className={`w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full overflow-hidden mb-3 shrink-0 ${isBrown ? 'bg-[#1C1F21]/20' : 'bg-[#956A47]/20'}`}>
        {participant.image ? (
          <Image
            src={participant.image}
            alt={participant.name}
            width={70}
            height={70}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className={`font-heading text-sm ${isBrown ? 'text-[#1C1F21]/50' : 'text-[#FFF5EC]/50'}`}>
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <p className={`font-heading font-bold text-sm md:text-[16.5px] leading-snug ${isBrown ? 'text-[#1C1F21]' : 'text-[#FFF5EC]'}`}>
        {participant.name}
      </p>

      {/* Role */}
      <p className={`font-just-sans text-xs md:text-[14.3px] mt-1 leading-snug ${isBrown ? 'text-[#1C1F21]/70' : 'text-[#FFF5EC]/70'}`}>
        {participant.role}
      </p>

      {/* Company */}
      <p className={`font-just-sans text-xs md:text-[14.3px] leading-snug ${isBrown ? 'text-[#1C1F21]/50' : 'text-[#FFF5EC]/50'}`}>
        {participant.company}
      </p>
    </div>
  );
}
