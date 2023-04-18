// import 'package:flutter/material.dart';
// import 'package:statsfl/statsfl.dart';

// void main() {
//   runApp(StatsFl(
//       align: Alignment.center, //Alignment of statsbox
//       child: const MyApp()));
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

// class _GenerateWidgetState extends State<GenerateWidget> {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text("Performance"),
//       ),
//       body: ListView(
//         children: List.generate(
//           10000,
//           (index) {
//             if (index == 0) {
//               debugPrint(DateTime.now().toString());
//             }

//             if (index == 9999) {
//               debugPrint(DateTime.now().toString());
//             }

//             return const SizedBox.shrink();
//           },
//         ),
//       ),
//     );
//   }
// }
