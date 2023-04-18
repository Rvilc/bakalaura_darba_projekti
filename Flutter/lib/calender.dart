// import 'package:flutter/material.dart';
// import 'package:syncfusion_flutter_calendar/calendar.dart';

// void main() {
//   runApp(const MyApp());
// }

// class MyApp extends StatelessWidget {
//   const MyApp({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return MaterialApp(
//       title: 'Flutter Demo',
//       theme: ThemeData(
//         primarySwatch: Colors.red,
//       ),
//       home: const MyHomePage(),
//     );
//   }
// }

// class MyHomePage extends StatefulWidget {
//   const MyHomePage({super.key});

//   @override
//   State<MyHomePage> createState() => _MyHomePageState();
// }

// class _MyHomePageState extends State<MyHomePage> {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(),
//       body: Center(
//         child: ElevatedButton(
//             onPressed: () {
//               Navigator.push(
//                 context,
//                 MaterialPageRoute(
//                   builder: (context) => const GenerateWidget(),
//                 ),
//               );
//             },
//             child: const Text("Generate 10k")),
//       ),
//     );
//   }
// }

// class GenerateWidget extends StatefulWidget {
//   const GenerateWidget({super.key});

//   @override
//   State<GenerateWidget> createState() => _GenerateWidgetState();
// }

class _GenerateWidgetState extends State<GenerateWidget> {
  int data = 100;
  bool isloading = true;

  List<Widget> children = [];

  @override
  void initState() {
    print(DateTime.now().toString());

    setState(() {
      children = List.generate(
        data,
        (index) {
          return SfCalendar();
        },
      );
    });
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
          : Stack(
              children: children,
            ),
    );
  }
}
