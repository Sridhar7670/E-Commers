interface Props {
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
}

const EmptyCartIcon = ({
  width = 128,
  height = 128,
  strokeColor = '#253D61',
  fillColor = 'none',
}: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 12H14L22 40H52L58 20H20"
      stroke={strokeColor}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={fillColor}
    />
    <circle cx="22" cy="52" r="4" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
    <circle cx="46" cy="52" r="4" stroke={strokeColor} strokeWidth="3" fill={fillColor} />
  </svg>
);
export default EmptyCartIcon