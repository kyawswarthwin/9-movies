#define MyAppName "9 Movies"
#define MyAppVersion "1.0.0"
#define MyAppExeName "9-movies.exe"

[Setup]
AppId={{E2F27654-6FEC-4798-B2D1-769A6D7148DE}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppVerName={#MyAppName} {#MyAppVersion}
DefaultDirName={pf}\{#MyAppName}
DefaultGroupName={#MyAppName}
OutputBaseFilename=Setup
Compression=lzma
SolidCompression=yes
MinVersion=0,6.1

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: "9-movies-x86.exe"; DestDir: "{app}"; DestName: "{#MyAppExeName}"; Flags: ignoreversion; Check: not IsWin64; AfterInstall: SetElevationBit('{app}\{#MyAppExeName}')
Source: "9-movies-x64.exe"; DestDir: "{app}"; DestName: "{#MyAppExeName}"; Flags: ignoreversion; Check: IsWin64; AfterInstall: SetElevationBit('{app}\{#MyAppExeName}')
Source: "icon.ico"; DestDir: "{app}"; Flags: ignoreversion
Source: ".env"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\icon.ico"; AfterInstall: SetElevationBit('{group}\{#MyAppName}.lnk')
Name: "{group}\{#MyAppName} Dashboard"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\icon.ico"; Parameters: "-d"; AfterInstall: SetElevationBit('{group}\{#MyAppName}.lnk')
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{commondesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\icon.ico"; Tasks: desktopicon; AfterInstall: SetElevationBit('{commondesktop}\{#MyAppName}.lnk')
Name: "{commondesktop}\{#MyAppName} Dashboard"; Filename: "{app}\{#MyAppExeName}"; IconFilename: "{app}\icon.ico"; Parameters: "-d"; Tasks: desktopicon; AfterInstall: SetElevationBit('{commondesktop}\{#MyAppName}.lnk')

[Dirs]
Name: "C:\Media\Movies"
Name: "C:\Media\Series"
Name: "C:\Media\Music"
Name: "C:\Media\Applications"
Name: "C:\Media\Games"

[Code]
procedure SetElevationBit(Filename: string);
var
  Buffer: string;
  Stream: TStream;
begin
  Filename := ExpandConstant(Filename);
  Log('Setting elevation bit for ' + Filename);

  Stream := TFileStream.Create(FileName, fmOpenReadWrite);
  try
    Stream.Seek(21, soFromBeginning);
    SetLength(Buffer, 1);
    Stream.ReadBuffer(Buffer, 1);
    Buffer[1] := Chr(Ord(Buffer[1]) or $20);
    Stream.Seek(-1, soFromCurrent);
    Stream.WriteBuffer(Buffer, 1);
  finally
    Stream.Free;
  end;
end;
