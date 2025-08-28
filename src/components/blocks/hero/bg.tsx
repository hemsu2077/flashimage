export default function Bg() {
  return (
    <div className="-z-50 absolute left-0 top-0 w-full h-full">
      {/* main gradient background */}
      <div 
        className="w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #f3f0ff 0%, #f7f3ff 20%, #faf7ff 40%, #fdf9f0 70%, #ffffff 100%)',
          filter: 'blur(0.5px)',
        }}
      />
      
      {/* texture overlay */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.06) 0%, transparent 70%),
            radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.04) 0%, transparent 60%),
            radial-gradient(circle at 20% 70%, rgba(139, 92, 246, 0.05) 0%, transparent 65%),
            radial-gradient(circle at 80% 80%, rgba(244, 114, 182, 0.03) 0%, transparent 60%)
          `,
          filter: 'blur(3px)',
        }}
      />
      
      {/* additional blur effect */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: `
            radial-gradient(ellipse 1200px 600px at 30% 10%, rgba(168, 85, 247, 0.03) 0%, transparent 80%),
            radial-gradient(ellipse 800px 400px at 70% 15%, rgba(236, 72, 153, 0.02) 0%, transparent 75%),
            radial-gradient(ellipse 600px 300px at 50% 90%, rgba(139, 92, 246, 0.025) 0%, transparent 70%)
          `,
          filter: 'blur(4px)',
        }}
      />
      
      {/* subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-radial-gradient(circle at 0 0, transparent 0, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />
    </div>
  );
}
