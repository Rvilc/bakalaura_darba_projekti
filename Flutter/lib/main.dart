import 'package:flutter/material.dart';
import 'package:pod_player/pod_player.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.red,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: ElevatedButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const GenerateWidget(),
                ),
              );
            },
            child: const Text("Generate 10k")),
      ),
    );
  }
}

class GenerateWidget extends StatefulWidget {
  const GenerateWidget({super.key});

  @override
  State<GenerateWidget> createState() => _GenerateWidgetState();
}

class _GenerateWidgetState extends State<GenerateWidget> {
  late List<PodPlayerController> _controller;

  int data = 100;
  bool isloading = true;

  List<Widget> children = [];

  @override
  void initState() {
    print(DateTime.now().toString());

    _controller = List.generate(
        5,
        (index) => PodPlayerController(
            playVideoFrom: PlayVideoFrom.asset('assets/video.mp4'),
            podPlayerConfig: const PodPlayerConfig(autoPlay: true, isLooping: false, videoQualityPriority: [720, 360]))
          ..initialise());

    setState(() {
      print(DateTime.now().toString());
      isloading = false;
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Performance App"),
      ),
      body: isloading
          ? const LinearProgressIndicator()
          : ListView(
              children: List.generate(_controller.length, (index) {
                return Center(
                  child: PodVideoPlayer(controller: _controller[index]),
                );
              }),
            ),
    );
  }
}
